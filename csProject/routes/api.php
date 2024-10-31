<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\BusinessHourController;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/booked-times/{date}', [AppointmentController::class, 'getBookedTimes'])->name('booked-times');
