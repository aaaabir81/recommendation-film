<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index($userId)
    {
        return response()->json(Favorite::where('user_id', $userId)->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'tmdb_movie_id' => 'required|integer',
            'type' => 'required|string',
        ]);

        $favorite = Favorite::create($request->all());
        return response()->json($favorite, 201);
    }

    public function destroy($id)
    {
        $favorite = Favorite::find($id);
        if (!$favorite) {
            return response()->json(['message' => 'Favorite item not found'], 404);
        }

        $favorite->delete();
        return response()->json(['message' => 'Favorite item deleted']);
    }
}
