<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index($discussionId)
    {
        return response()->json(Message::where('disc_id', $discussionId)->get());
    }

    public function store(Request $request) { $request->validate([ 'disc_id' => 'required|integer|exists:discussions,id', 'sender' => 'required|string', 'message' => 'required|string', 'sent_at' => 'required|date' ]); $message = Message::create($request->all()); return response()->json($message, 201); }public function show($id)
    {
        $message = Message::find($id);
        if (!$message) {
            return response()->json(['message' => 'Message not found'], 404);
        }

        return response()->json($message);
    }

    public function destroy($id)
    {
        $message = Message::find($id);
        if (!$message) {
            return response()->json(['message' => 'Message not found'], 404);
        }

        $message->delete();
        return response()->json(['message' => 'Message deleted']);
    }
}
