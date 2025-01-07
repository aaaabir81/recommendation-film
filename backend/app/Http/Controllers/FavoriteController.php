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
            'tmdb_movie_id' => 'required|integer', // ID du film est requis et doit être un entier
            'type' => 'required|string|in:movie,series', // Le type doit être "movie" ou "series"
        ]);
    
        $favorite = Favorite::create([
            'user_id' => auth()->id(),
            'tmdb_movie_id' => $request->tmdb_movie_id,
            'type' => $request->type,
            'added_at' => now(),
        ]);
    
        return response()->json(['message' => 'Favori ajouté avec succès', 'favorite' => $favorite], 201);
    }

    public function destroy($id)
{
    $favorite = Favorite::where('tmdb_movie_id', $id)->where('user_id', auth()->id())->first();

    if (!$favorite) {
        return response()->json(['message' => 'Favori non trouvé'], 404);
    }

    $favorite->delete();
    return response()->json(['message' => 'Favori supprimé avec succès'], 200);
}

}
