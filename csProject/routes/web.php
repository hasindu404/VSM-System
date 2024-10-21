<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\BusinessHourController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/CustomerDashboard', function () {
    return Inertia::render('Customer/CustomerDashboard'); // Ensure the casing matches
})->name('CustomerDashboard');

//Admin
Route::get('/AdminDashboard', function () {
    return Inertia::render('Admin/AdminDashboard'); // Ensure the casing matches
})->name('AdminDashboard');

Route::get('/UserManagement', function () {
    return Inertia::render('Admin/UserManagement'); // Ensure the casing matches
})->name('UserManagement');

Route::get('/BusinessHours', function () {
    return Inertia::render('Admin/BusinessHours'); // Ensure the casing matches
})->name('BusinessHours');

//Customer
Route::get('/CustomerDashboard', function () {
    return Inertia::render('Customer/CustomerDashboard'); // Ensure the casing matches
})->name('CustomerDashboard');

Route::get('/create', function () {
    return Inertia::render('Appointments/Create'); // Ensure the casing matches
})->name('create');


require __DIR__.'/auth.php';

//Appointments 
Route::post('/appointments', [AppointmentController::class, 'store'])->name('appointments');

//BusinessHours
// Route::get('/business-hours', [BusinessHourController::class, 'index']);
Route::put('/business-hours', [BusinessHourController::class, 'update']);
// Route::post('/business-hours', [BusinessHourController::class, 'store']);
