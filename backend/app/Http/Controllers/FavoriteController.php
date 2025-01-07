<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;

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

public function getUserFavorites(Request $request)
{
    $user = $request->user(); // Récupérer l'utilisateur connecté

    if (!$user) {
        return response()->json(['error' => 'Utilisateur non authentifié'], 401);
    }

    // Récupérer les favoris avec les champs nécessaires
    $favorites = $user->favorites()->get(['tmdb_movie_id', 'type', 'added_at']);

    $movies = [];
    foreach ($favorites as $favorite) {
        // Appeler l'API TMDb pour obtenir les détails du film
        $response = Http::get("https://api.themoviedb.org/3/movie/{$favorite->tmdb_movie_id}", [
            'api_key' => env('TMDB_API_KEY'),
        ]);

        if ($response->successful()) {
            $movieDetails = $response->json();
            $movies[] = [
                'tmdb_movie_id' => $favorite->tmdb_movie_id,
                'title' => $movieDetails['title'],
                'poster_path' => $movieDetails['poster_path'],
                'added_at' => $favorite->added_at,
            ];
        }
    }

    return response()->json($movies, 200);
}




public function removeFavorite(Request $request, $tmdbMovieId)
{
    \Log::info("Reçu pour suppression : $tmdbMovieId");
    $user = $request->user();

    if (!$user) {
        return response()->json(['error' => 'Utilisateur non authentifié'], 401);
    }

    $favorite = $user->favorites()->where('tmdb_movie_id', $tmdbMovieId)->first();

    if (!$favorite) {
        return response()->json(['error' => 'Favori non trouvé'], 404);
    }

    $favorite->delete();

    return response()->json(['message' => 'Favori retiré avec succès'], 200);
}




}