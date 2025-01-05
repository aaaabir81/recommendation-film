<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\DiscussionController;
use App\Http\Controllers\MessageController;

// Routes pour les utilisateurs
Route::apiResource('users', UserController::class);

// Routes pour la wishlist
Route::apiResource('users/{userId}/wishlist', WishlistController::class);

// Routes pour les favoris
Route::apiResource('users/{userId}/favorites', FavoriteController::class);

// Routes pour les discussions
Route::apiResource('users/{userId}/discussions', DiscussionController::class);

// Routes pour les messages
Route::apiResource('discussions/{discussionId}/messages', MessageController::class);


Route::get('/', function () {
    return view('welcome');
});
