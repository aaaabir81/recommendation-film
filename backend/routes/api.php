<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Middleware\HandleCors;
use App\Http\Controllers\MovieController;

use App\Http\Controllers\UserController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\DiscussionController;
use App\Http\Controllers\MessageController;

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);
Route::get('user', [UserController::class, 'getUser'])->middleware('auth:sanctum');

Route::get('wishlist', [WishlistController::class, 'index'])->middleware('auth:sanctum');
Route::post('wishlist', [WishlistController::class, 'store'])->middleware('auth:sanctum');
Route::delete('wishlist/{id}', [WishlistController::class, 'destroy'])->middleware('auth:sanctum');

Route::get('favorites', [FavoriteController::class, 'index'])->middleware('auth:sanctum');
Route::post('favorites', [FavoriteController::class, 'store'])->middleware('auth:sanctum');
Route::delete('favorites/{id}', [FavoriteController::class, 'destroy'])->middleware('auth:sanctum');

Route::get('discussions', [DiscussionController::class, 'index'])->middleware('auth:sanctum');
Route::post('discussions', [DiscussionController::class, 'store'])->middleware('auth:sanctum');

Route::post('messages', [MessageController::class, 'store'])->middleware('auth:sanctum');

Route::post('users', [UserController::class, 'store']);

Route::get('/movies', [MovieController::class, 'index']);




