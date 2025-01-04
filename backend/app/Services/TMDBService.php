<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class TMDBService
{
    protected $apiKey;
    protected $apiUrl;

    public function __construct()
    {
        $this->apiKey = env('TMDB_API_KEY');
        $this->apiUrl = env('TMDB_API_URL');
    }

    public function getMovies()
    {
        $response = Http::get("{$this->apiUrl}/movie/popular", [
            'api_key' => $this->apiKey,
        ]);

        return $response->json();
    }
}
