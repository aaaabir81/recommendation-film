<?php

namespace App\Http\Controllers;

use App\Models\Discussion;
use Illuminate\Http\Request;

class DiscussionController extends Controller
{
    public function index($userId)
    {
        return response()->json(Discussion::where('user_id', $userId)->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'started_at' => 'required|date',
        ]);

        $discussion = Discussion::create($request->all());
        return response()->json($discussion, 201);
    }

    public function show($id)
    {
        $discussion = Discussion::find($id);
        if (!$discussion) {
            return response()->json(['message' => 'Discussion not found'], 404);
        }

        return response()->json($discussion);
    }

    public function destroy($id)
    {
        $discussion = Discussion::find($id);
        if (!$discussion) {
            return response()->json(['message' => 'Discussion not found'], 404);
        }

        $discussion->delete();
        return response()->json(['message' => 'Discussion deleted']);
    }
}
