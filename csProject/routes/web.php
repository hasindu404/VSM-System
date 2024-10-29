<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\VehicalController;
use App\Http\Controllers\BusinessHourController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\HomeController;
use App\Models\Vehical;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Admin/AdminDashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/customer',[CustomerController::class,'index'])->name('customer.index');
Route::post('/customer',[CustomerController::class, 'store'])->name('customer.store');
Route::get('/customer/{customer}/edit',[CustomerController::class, 'edit'])->name('customer.edit');
Route::put('/customer/{customer}/update',[CustomerController::class, 'update'])->name('customer.update');
Route::delete('/customer/{customer}/delete',[CustomerController::class, 'delete'])->name('customer.delete');

Route::get('/vehical',[VehicalController::class,'index'])->name('vehical.index');
Route::post('/vehical',[VehicalController::class, 'store'])->name('vehical.store');
Route::get('/vehicle/{vehical}/edit',[VehicalController::class, 'edit'])->name('vehicle.edit');
Route::put('/vehicle/{vehical}/update',[VehicalController::class, 'update'])->name('vehicle.update');
Route::delete('/vehicle/{vehical}/delete',[VehicalController::class, 'delete'])->name('vehicle.delete');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//Web
Route::get('/Services', function () {
    return Inertia::render('Service'); // Ensure the casing matches
})->name('Services');

Route::get('/Media', function () {
    return Inertia::render('Media'); // Ensure the casing matches
})->name('Media');

Route::get('/About', function () {
    return Inertia::render('About'); // Ensure the casing matches
})->name('About');

Route::get('/fullservice', function () {
    return Inertia::render('Fullservice'); // Ensure the casing matches
})->name('fullservice');

Route::get('/normalservice', function () {
    return Inertia::render('Normalservice'); // Ensure the casing matches
})->name('normalservice');

Route::get('/ContactUs', function () {
    return Inertia::render('Contact'); // Ensure the casing matches
})->name('ContactUs');

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
})->middleware(['auth', 'verified'])->name('CustomerDashboard');

Route::get('/create', function () {
    return Inertia::render('Appointments/Create'); // Ensure the casing matches
})->name('create');

Route::get('/personal', function () {
    return Inertia::render('Customer/Personalinfo'); // Ensure the casing matches
})->name('profile');

Route::get('/vehiclereg', function () {
    return Inertia::render('Vehicle/VehicleRegistration'); // Ensure the casing matches
})->name('vehiclereg');

Route::get('/service',function(){
    return Inertia::render('Customer/ServiceHistory');
})->name('service');

require __DIR__.'/auth.php';

// Admin auth
Route::get('Admin/Dashboard', [HomeController::class, 'index']);

// Appointments 
Route::post('/appointments', [AppointmentController::class, 'store'])->name('appointments');
Route::put('/business-hours/update/{dayOfWeek}', [BusinessHoursController::class, 'update'])->name('business.hours.update');
Route::get('/booked-times/{date}', [AppointmentController::class, 'getBookedTimes'])->name('booked-times');
Route::get('/business-hours/{dayOfWeek}', [BusinessHourController::class, 'show']);

//feedback
Route::get('/feedback',function(){
    return Inertia::render('Customer/Feedback');
})->name('feedback');
Route::post('/feedbackstore', [FeedbackController::class,'store'])->name('feedback.store');


