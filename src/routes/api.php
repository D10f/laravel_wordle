<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/dict', function (Request $request) {
    $wordLength = $request->query('wordLength');
    $language = $request->query('lang');
    $file = file(storage_path("app/{$language}_dict.txt"), FILE_IGNORE_NEW_LINES);
    return $file;
    /*
    $targetLengthWords = array_filter($file, fn($word) => strlen($word) === (int)$wordLength);
    return array_rand($targetLengthWords);
    */
});
