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
       // If business is closed on the selected day
if (!$businessHour || !$businessHour->isOpen) {
    return response()->json([
        'errorType' => 'business_day',
        'message' => 'Business is closed on this day.'
    ], 400); // 400 Bad Request
}

// If appointment time is outside business hours
if ($appointmentTime->lt(Carbon::parse($businessHour->openingTime)) || 
    $appointmentTime->gt(Carbon::parse($businessHour->closingTime))) {
    return response()->json([
        'errorType' => 'business_hours',
        'message' => 'Appointment time is outside of business hours.'
    ], 422); // 422 Unprocessable Entity
}

        // Create a new appointment
        $appointment = Appointment::create($validatedData);

         // Optionally, return a response or redirect
        //  return response()->json(['success' => true, 'message' => 'Appointment created successfully!']);

        if ($appointmentTime->gte(Carbon::parse($businessHour->openingTime)) && $appointmentTime->lte(Carbon::parse($businessHour->closingTime))) {
            return back()->with('success', 'Appointment time is within business hours.');
        }
        // return response()->json(['success' => true , 'message' => 'The appointment has been successfully created.']);
        

}

}