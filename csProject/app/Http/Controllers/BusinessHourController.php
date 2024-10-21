<?php

namespace App\Http\Controllers;

use App\Models\BusinessHour;
use Illuminate\Http\Request;

class BusinessHourController extends Controller
{
    // Display the business hours
    // public function index()
    // {
    //     $businessHours = BusinessHour::all();
    //     return response()->json($businessHours); // or pass to a view for rendering
    // }

    // Update business hours
   
    public function update(Request $request)
{
    // Retrieve the dayOfWeek from the request
    $dayOfWeek = $request->input('dayOfWeek');
    
    // Validate the incoming request data
    $validatedData = $request->validate([
        'dayOfWeek' => 'required|string',
        'openingTime' => 'nullable|date_format:H:i',
        'closingTime' => 'nullable|date_format:H:i',
        'isOpen' => 'required|boolean',
    ]);

    // Find the business hour record using the dayOfWeek
    $businessHour = BusinessHour::where('dayOfWeek', $dayOfWeek)->firstOrFail();

    // Update the business hour record with validated data
    $businessHour->update($validatedData);

    // Return a success response after updating the record
    return response()->json(['success' => true, 'message' => 'Business hours updated successfully!']);
}





    // // Optionally add a method to create new business hours if needed
    // public function store(Request $request)
    // {
    //     $validatedData = $request->validate([
    //         'dayOfWeek' => 'required|in:Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
    //         'openingTime' => 'nullable|date_format:H:i',
    //         'closingTime' => 'nullable|date_format:H:i',
    //         'isOpen' => 'required|boolean',
    //     ]);

    //     BusinessHour::create($validatedData);

    //     return response()->json(['success' => true, 'message' => 'Business hours created successfully!']);
    // }
}
