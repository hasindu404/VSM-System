<?php

namespace App\Http\Controllers;
use App\Models\Appointment;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    // Method to handle the creation of an appointment
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'customerID' => 'required|integer',
            'appointmentStatus' => 'required|string',
            'serviceType' => 'required|string',
            'appointmentDate' => 'required|date',
            'employerType' => 'required|string',
            'timeSlot' => 'required|date_format:H:i',
        ]);

        // Create a new appointment
        $appointment = Appointment::create($validatedData);

         // Optionally, return a response or redirect
         return redirect()->route('login')->with('success', 'Appointment created successfully!');
        // return response()->json(['success' => true , 'message' => 'The appointment has been successfully created.']);
        

}

}