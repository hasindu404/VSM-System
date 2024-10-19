<?php

namespace App\Http\Controllers;
use App\Models\Appointment;
use App\Models\BusinessHour;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Carbon\Carbon;

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

        // Parse the appointment date and time
        $appointmentDate = Carbon::parse($validatedData['appointmentDate']); // Parsing appointment date
        $appointmentTime = Carbon::parse($validatedData['timeSlot']); // Parsing appointment time
        $dayOfWeek = $appointmentDate->format('l');  // Getting the day of the week (e.g., 'Monday')

        // Fetch the business hours for the selected day
        $businessHour = BusinessHour::where('dayOfWeek', $dayOfWeek)->first(); // Fetching business hours

        // Check if the business is open on that day
        if (!$businessHour || !$businessHour->isOpen) { // Business closed check
            return response()->json(['error' => 'Business is closed on this day.'], 400);
        }

         // Check if the appointment time is within business hours
         if ($appointmentTime->lt(Carbon::parse($businessHour->openingTime)) || // Time before opening
         $appointmentTime->gt(Carbon::parse($businessHour->closingTime))) { // Time after closing
         return response()->json(['error' => 'Appointment time is outside of business hours.'], 400);
     }

        // Create a new appointment
        $appointment = Appointment::create($validatedData);

         // Optionally, return a response or redirect
        return redirect()->route('login')->with('success', 'Appointment created successfully!');
        // return response()->json(['success' => true , 'message' => 'The appointment has been successfully created.']);
        

}

}