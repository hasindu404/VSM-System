<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\CustomerController;
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

Route::get('/custmang',[CustomerController::class,'index'])->name('customer.custmang');
Route::post('/custmang',[CustomerController::class, 'store'])->name('customer.store');
Route::get('/custmang/{customer}/edit',[CustomerController::class, 'edit'])->name('customer.edit');
Route::put('/custmang/{customer}/update',[CustomerController::class, 'update'])->name('customer.update');
Route::delete('/custmang/{customer}/delete',[CustomerController::class, 'delete'])->name('customer.delete');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/CustomerDashboard', function () {
    return Inertia::render('Customer/CustomerDashboard'); // Ensure the casing matches
})->name('CustomerDashboard');

Route::get('/AdminDashboard', function () {
    return Inertia::render('Admin/AdminDashboard'); // Ensure the casing matches
})->name('AdminDashboard');

Route::get('/create', function () {
    return Inertia::render('Appointments/Create'); // Ensure the casing matches
})->name('create');


require __DIR__.'/auth.php';


Route::post('/appointments', [AppointmentController::class, 'store'])->name('appointments');
