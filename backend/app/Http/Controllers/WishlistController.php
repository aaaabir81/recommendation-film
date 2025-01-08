<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
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
            'tmdb_movie_id' => 'required|integer',
            'type' => 'required|string|in:movie,series',
            'watch_time' => 'nullable|date', // Validation pour watch_time
        ]);
    
        $wishlist = Wishlist::create([
            'user_id' => auth()->id(),
            'tmdb_movie_id' => $request->tmdb_movie_id,
            'type' => $request->type,
            'added_at' => now(),
            'watch_time' => $request->watch_time, // Enregistrer la date choisie
        ]);
    
        return response()->json(['message' => 'Ajouté à la wishlist avec succès', 'wishlist' => $wishlist], 201);
    }
    public function destroy($tmdbMovieId)
    {
        $wishlistItem = Wishlist::where('tmdb_movie_id', $tmdbMovieId)
            ->where('user_id', auth()->id())
            ->first();

        if (!$wishlistItem) {
            return response()->json(['message' => 'Élément non trouvé dans la wishlist'], 404);
        }

        $wishlistItem->delete();

        return response()->json(['message' => 'Élément retiré de la wishlist avec succès'], 200);
    }

    public function getUserWishlist(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['error' => 'Utilisateur non authentifié'], 401);
        }

        $wishlist = $user->wishlist()->get(['tmdb_movie_id', 'type', 'added_at', 'watch_time']);

        $movies = [];
        foreach ($wishlist as $item) {
            $response = Http::get("https://api.themoviedb.org/3/movie/{$item->tmdb_movie_id}", [
                'api_key' => env('TMDB_API_KEY'),
            ]);

            if ($response->successful()) {
                $movieDetails = $response->json();
                $movies[] = [
                    'tmdb_movie_id' => $item->tmdb_movie_id,
                    'title' => $movieDetails['title'],
                    'poster_path' => $movieDetails['poster_path'],
                    'added_at' => $item->added_at,
                    'watch_time' => $item->watch_time,
                ];
            }
        }

        return response()->json($movies, 200);
    }
}
