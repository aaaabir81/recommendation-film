<?php

namespace App\Http\Controllers;

use App\Models\Discussion;
use Illuminate\Http\Request;
use App\Models\Message;

class DiscussionController extends Controller
{
    public function getMessages($discussionId) { return response()->json(Message::where('disc_id', $discussionId)->get()); }
    public function index($userId) { return response()->json(Discussion::where('user_id', $userId)->get()); }
    public function store(Request $request) { $discussion = new Discussion(); $discussion->user_id = $request->user_id; $discussion->started_at = now(); $discussion->save(); return response()->json($discussion); }

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
