<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
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
        
           // Fetch the business hour record based on dayOfWeek
           $businessHour = BusinessHour::where('dayOfWeek', $dayOfWeek)->first();
   
           // Check if business hours exist for that day
           if (!$businessHour) {
                Log::warning('Business hours not found for day: ' . $dayOfWeek);
               return response()->json(['error' => 'Business hours not found'], 404);
           }
   
           
           // Return the business hours as JSON
           return response()->json($businessHour);
       }
   
    
       public function update(Request $request, $dayOfWeek)
       {
        Log::info('Update method called'); // This should log when the method is called
        Log::info('Request data: ', $request->all());
           // Validate the request data
           $request->validate([
               'openingTime' => 'nullable|date_format:H:i',
               'closingTime' => 'nullable|date_format:H:i',
               'isOpen' => 'required|boolean',
               'step' => 'nullable|integer|min:1',
           ]);
       
           // Find the business hour entry for the specific day of the week
           $businessHour = BusinessHour::where('dayOfWeek', $dayOfWeek)->first();
       
           // If the entry doesn't exist, return an error message
           if (!$businessHour) {
               return redirect()->back()->with('error', 'Business hour entry not found.');
           }
       
           // Log current state
    Log::info('Current Business Hour Entry: ', $businessHour->toArray());


           // Update the isOpen status
           $businessHour->isOpen = $request->input('isOpen');
       
           // Only update openingTime and closingTime if isOpen is true
           if ($request->input('isOpen')) {
               $businessHour->openingTime = $request->input('openingTime'); // Set if provided
               $businessHour->closingTime = $request->input('closingTime'); // Set if provided
           } // Optional: Resetting to null if closed
           else {
               // $businessHour->openingTime = null; // Uncomment if you want to reset to null
               // $businessHour->closingTime = null; // Uncomment if you want to reset to null
           }
       
           // Update the step if provided
           if ($request->has('step')) {
               $businessHour->step = $request->input('step');
           }
       
           // Save the changes
           try {
               $businessHour->save();
               return redirect()->back()->with('success', 'Business hours updated successfully.');
           } catch (\Exception $e) {
               Log::error('Failed to update business hours: ' . $e->getMessage());
               return redirect()->back()->with('error', 'Failed to update business hours.');
           }
       }

       
    //    public function update(Request $request,$dayOfWeek)
    //    {
    //        $request->validate([
    //            'openingTime' => 'nullable|date_format:H:i',
    //            'closingTime' => 'nullable|date_format:H:i',
    //            'isOpen' => 'required|boolean',
    //            'step' => 'nullable|integer|min:1',
    //        ]);
       
    //        $businessHour = BusinessHour::where('dayOfWeek', $request->dayOfWeek)->first();
       
    //        // If the entry doesn't exist, handle the error
    //     if (!$businessHour) {
    //         return redirect()->back()->with('success', 'Business hour entry not found.');
    //     }
        
    //     // Update the business hour entry
    //         $businessHour->isOpen = $request->isOpen;
    //         $businessHour->openingTime = $request->openingTime;
    //         $businessHour->closingTime = $request->closingTime;
    //         $businessHour->step = $request->step;
            
    //     // Save the changes
    //         $businessHour->save();
              
    //         return redirect()->back()->with('success', 'Business hours updated successfully.');
    //      }

   
        // Example controller method in Laravel
        public function getClosedDays()
        {
            $closedDays = DB::table('business_hours')
                ->where('isOpen', 0)
                ->pluck('dayOfWeek'); // Assuming 'date' is the column name

            return response()->json($closedDays);
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

