<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\BusinessHourController;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route::get('/booked-times/{date}', [AppointmentController::class, 'getBookedTimes'])->name('booked-times');
// Route::get('/closed-days', [BusinessHourController::class, 'getClosedDays'])->name('closed-days');
Route::get('/appointmenthandle', [AppointmentController::class, 'index'])->name('appointmenthandle');
Route::post('/appointments/{id}/finish', [AppointmentController::class, 'finish'])->name('finish');
Route::put('/business-hours/{dayOfWeek}', [BusinessHourController::class, 'update'])->name('business.hours.update');
Route::put('/appointments/{id}', [AppointmentController::class, 'updateStatus'])->name('appointments.update');
Route::get('/viewappointments', [AppointmentController::class, 'displayCustomerAppointments'])->name('viewappointments');
Route::post('/feedback',[FeedbackController::class, 'store'])->name('feedback.store');
