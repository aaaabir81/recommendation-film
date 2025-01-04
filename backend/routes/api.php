<?php

<<<<<<< HEAD
=======
use App\Http\Controllers\UserController;
>>>>>>> fb944df910804a520c2f0d4b2ce1a934e007ef20
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Middleware\HandleCors;
use App\Http\Controllers\MovieController;

Route::get('/movies', [MovieController::class, 'index']);



<<<<<<< HEAD
=======
  Route::resource('users', UserController::class)->middleware(HandleCors::class);
>>>>>>> fb944df910804a520c2f0d4b2ce1a934e007ef20

