<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\DiscussionController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\OpenAIController;

Route::get('/discussions/messages/{discussionId}', [DiscussionController::class, 'getMessages']);

Route::post('register', [UserController::class, 'register']);
// routes/api.php
Route::get('/user', [UserController::class, 'getUser'])->middleware('auth:sanctum');
Route::get('/discussions/{userId}', [DiscussionController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/wishlist', [WishlistController::class, 'getUserWishlist']);
    Route::post('/wishlist', [WishlistController::class, 'store']);
    Route::delete('/wishlist/{tmdbMovieId}', [WishlistController::class, 'destroy']);
});

Route::get('favorites', [FavoriteController::class, 'index'])->middleware('auth:sanctum');
Route::post('favorites', [FavoriteController::class, 'store'])->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->delete('/favorites/{id}', [FavoriteController::class, 'destroy']);

Route::get('discussions', [DiscussionController::class, 'index']);
Route::post('discussions', [DiscussionController::class, 'store']);

Route::post('messages', [MessageController::class, 'store']);

Route::post('users', [UserController::class, 'store']);

Route::get('movies', [MovieController::class, 'index']); // Assurez-vous que ce contrôleur renvoie les bons résultats

Route::get('search/movie', [MovieController::class, 'searchMovies']);
Route::get('trending/movie/day', [MovieController::class, 'getTrend']);
Route::get('movie/popular', [MovieController::class, 'getPopular']);
Route::get('movie/upcoming', [MovieController::class, 'getUpComingMovies']);
Route::get('movie/top_rated', [MovieController::class, 'getTopRatedMovies']);
Route::get('discover/movie', [MovieController::class, 'getDiscoverMovies']);
Route::get('genre/movie/list', [MovieController::class, 'getGenres']);
Route::get('genre/{id}/movies', [MovieController::class, 'getMoviesByGenre']);
Route::get('movie/{id}', [MovieController::class, 'getMovie']);
Route::get('movie/{id}/reviews', [MovieController::class, 'getMovieReviews']);
Route::get('movie/{id}/credits', [MovieController::class, 'getMovieCredits']);
Route::get('movie/{id}/images', [MovieController::class, 'getBackdropsImages']);
Route::get('person/{id}', [MovieController::class, 'getPersonDetail']);
Route::get('movie/{id}/videos', [MovieController::class, 'getMovieTrailers']);

Route::post('/login', [UserController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [UserController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/favorites', [FavoriteController::class, 'getUserFavorites']);

Route::middleware('auth:sanctum')->delete('/favorites/{tmdbMovieId}', [FavoriteController::class, 'removeFavorite']);



Route::middleware('auth:sanctum')->group(function () {
    Route::delete('wishlist/{tmdbMovieId}', [WishlistController::class, 'destroy']);
});


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::put('/users/{id}', [UserController::class, 'update']);
});


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [ProfileController::class, 'getProfile']);
    Route::post('/profile', [ProfileController::class, 'updateProfile']);
});

Route::post('openai/chat', [OpenAIController::class, 'chat']);
Route::post('CineChill-response', [OpenAIController::class, 'getCineChillResponse']);

