<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\User;

class MovieController extends Controller
{
    public function index() { 
        $response = Http::get('https://api.themoviedb.org/3/movie/popular', 
        [ 'api_key' => env('TMDB_API_KEY') ]); 
        if ($response->successful()) 
        { return response()->json($response->json()); } 
        else {
             return response()->json(['error' => 'Failed to fetch data'], 500); } 
        }

    public function searchMovies(Request $request)
    {
        $response = Http::get('https://api.themoviedb.org/3/search/movie', [
            'api_key' => env('TMDB_API_KEY'),
            'query' => $request->query('query')
        ]);

        return $this->handleResponse($response);
    }

    public function getTrend()
    {
        $response = Http::get('https://api.themoviedb.org/3/trending/movie/day', [
            'api_key' => env('TMDB_API_KEY')
        ]);

        return $this->handleResponse($response);
    }

    public function getMovieTrailers($id)
{
    $response = Http::get("https://api.themoviedb.org/3/movie/{$id}/videos", [
        'api_key' => env('TMDB_API_KEY')
    ]);

    return $this->handleResponse($response);
}


    public function getPopular(Request $request)
    {
        $page = $request->query('page', 1);
        $response = Http::get('https://api.themoviedb.org/3/movie/popular', [
            'api_key' => env('TMDB_API_KEY'),
            'page' => $page
        ]);

        return $this->handleResponse($response);
    }

    public function getUpComingMovies(Request $request)
    {
        $page = $request->query('page', 1);
        $response = Http::get('https://api.themoviedb.org/3/movie/upcoming', [
            'api_key' => env('TMDB_API_KEY'),
            'page' => $page
        ]);

        return $this->handleResponse($response);
    }

    public function getTopRatedMovies(Request $request)
    {
        $page = $request->query('page', 1);
        $response = Http::get('https://api.themoviedb.org/3/movie/top_rated', [
            'api_key' => env('TMDB_API_KEY'),
            'page' => $page
        ]);

        return $this->handleResponse($response);
    }

    public function getDiscoverMovies()
    {
        $response = Http::get('https://api.themoviedb.org/3/discover/movie', [
            'api_key' => env('TMDB_API_KEY')
        ]);

        return $this->handleResponse($response);
    }

    public function getGenres()
    {
        $response = Http::get('https://api.themoviedb.org/3/genre/movie/list', [
            'api_key' => env('TMDB_API_KEY')
        ]);

        return $this->handleResponse($response);
    }

    public function getMoviesByGenre($id)
    {
        $response = Http::get("https://api.themoviedb.org/3/genre/{$id}/movies", [
            'api_key' => env('TMDB_API_KEY')
        ]);

        return $this->handleResponse($response);
    }

    public function getMovie($id)
    {
        $response = Http::get("https://api.themoviedb.org/3/movie/{$id}", [
            'api_key' => env('TMDB_API_KEY')
        ]);

        return $this->handleResponse($response);
    }

    public function getMovieReviews($id)
    {
        $response = Http::get("https://api.themoviedb.org/3/movie/{$id}/reviews", [
            'api_key' => env('TMDB_API_KEY')
        ]);

        return $this->handleResponse($response);
    }

    public function getMovieCredits($id)
    {
        $response = Http::get("https://api.themoviedb.org/3/movie/{$id}/credits", [
            'api_key' => env('TMDB_API_KEY')
        ]);

        return $this->handleResponse($response);
    }

    public function getBackdropsImages($id)
    {
        $response = Http::get("https://api.themoviedb.org/3/movie/{$id}/images", [
            'api_key' => env('TMDB_API_KEY')
        ]);

        return $this->handleResponse($response);
    }

    public function getPersonDetail($id)
    {
        $response = Http::get("https://api.themoviedb.org/3/person/{$id}", [
            'api_key' => env('TMDB_API_KEY')
        ]);

        return $this->handleResponse($response);
    }

    private function handleResponse($response)
    {
        if ($response->successful()) {
            return response()->json($response->json());
        } else {
            return response()->json(['error' => 'Failed to fetch data'], 500);
        }
    }


    public function getRecommendations($userId)
{
    $user = User::find($userId);
    if (!$user) {
        return response()->json(['error' => 'Utilisateur non trouvé'], 404);
    }

    // Calcul de l'âge de l'utilisateur
    $age = now()->diffInYears($user->birth_date);

    
    $url = "https://api.themoviedb.org/3/discover/movie?api_key=e352109dfe44d5dc64e16acab1384325&language=fr";

    // Paramètre de certification basé sur l'âge
    $certification = $this->getCertificationForAge($age);

    // Ajout du paramètre certification et du filtre de genre à l'URL
    $url .= '&certification_country=US';
    $url .= '&certification.lte=' . $certification;
    $url .= '&with_genres=' . $this->getSuitableGenresForAge($age);


    // Effectuer la requête
    $response = Http::get($url);

    \Log::info('API Response: ' . $response->body()); // Log de la réponse brute

    if ($response->failed()) {
        return response()->json(['error' => 'Erreur lors de la récupération des recommandations'], 500);
    }

    return response()->json($response->json());
}

private function getCertificationForAge($age)
{
    if ($age < 13) {
        return 'G'; // Tous publics (seulement des films pour les enfants)
    } elseif ($age < 17) {
        return 'PG'; // Interdit aux moins de 13 ans, mais adaptés aux enfants plus âgés
    } else {
        return 'PG-13'; // Pour les 13 ans et plus (films adaptés à un public plus large)
    }
}

private function getSuitableGenresForAge($age)
{
    if ($age < 13) {
        return '27'; // Adding the ID for animation
    } elseif ($age < 17) {
        return '27'; // Adding genre IDs suitable for teenagers
    } else {
        return '27'; // Adding a wide variety of genres suitable for adults
    }
}

 
}
