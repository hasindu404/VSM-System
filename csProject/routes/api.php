<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\BusinessHourController;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::put('/business-hours/{id}', [BusinessHourController::class, 'update']);
