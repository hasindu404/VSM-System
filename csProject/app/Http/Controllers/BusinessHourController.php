<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Log;
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

       // Fetch business hours for a specific day of the week
       public function show($dayOfWeek)
       {
            Log::info('This is an info logggg message.');
           // Fetch the business hour record based on dayOfWeek
           $businessHour = BusinessHour::where('dayOfWeek', $dayOfWeek)->first();
   
           // Check if business hours exist for that day
           if (!$businessHour) {
               return response()->json(['error' => 'Business hours not found'], 404);
           }
   
           Log::info('This is an info log message.');
           // Return the business hours as JSON
           return response()->json($businessHour);
       }
   
       
       public function update(Request $request,$dayOfWeek)
       {
           $request->validate([
               'openingTime' => 'nullable|date_format:H:i',
               'closingTime' => 'nullable|date_format:H:i',
               'isOpen' => 'required|boolean',
               'step' => 'nullable|integer|min:1',
           ]);
       
           $businessHour = BusinessHour::where('dayOfWeek', $request->dayOfWeek)->first();
       
           // If the entry doesn't exist, handle the error
        if (!$businessHour) {
            return redirect()->back()->with('success', 'Business hour entry not found.');
        }
        
        // Update the business hour entry
            $businessHour->is_open = $request->is_open;
            $businessHour->opening_time = $request->opening_time;
            $businessHour->closing_time = $request->closing_time;
            $businessHour->step = $request->step;
            
        // Save the changes
            $businessHour->save();
              
            return redirect()->back()->with('success', 'Business hours updated successfully.');
         }
       
           
         
    
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

