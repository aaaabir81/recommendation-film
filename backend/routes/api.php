<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Middleware\HandleCors;
use App\Http\Controllers\MovieController;

Route::get('/movies', [MovieController::class, 'index']);




