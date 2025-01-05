<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function index($userId)
    {
        return response()->json(Wishlist::where('user_id', $userId)->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'tmdb_movie_id' => 'required|integer',
            'type' => 'required|string',
        ]);

        $wishlist = Wishlist::create($request->all());
        return response()->json($wishlist, 201);
    }

    public function destroy($id)
    {
        $wishlist = Wishlist::find($id);
        if (!$wishlist) {
            return response()->json(['message' => 'Wishlist item not found'], 404);
        }

        $wishlist->delete();
        return response()->json(['message' => 'Wishlist item deleted']);
    }
}
