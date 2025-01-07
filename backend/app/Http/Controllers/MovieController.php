<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

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







    
}
