<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    public function index(){
        $feedbacks = Feedback::all();
        return Inertia::render('Customers/Feedback', ['feedback' => $feedbacks]);
}
    public function store(Request $request){
        $data=($request)->validate([
                // 'userid' => 'required',
                'servicetype' => 'required',
                'servicedate' => 'required|date',
                'description' => 'required'
        ]);
            
    // Check for authenticated user
    if (auth()->check()) {
        $userid = auth()->id();
        Log::info('Authenticated user ID: ' . $userid);
    } else {
        Log::warning('No authenticated user found. Appointment cannot be created.');
        return response()->json(['status' => 'error', 'message' => 'User not authenticated.'], 401);
    }

        $userid = auth()->id();

         // Proceed to create the appointment if valid
         $appointment = Appointment::create(array_merge($validatedData, [
            'customerID' => $customerID, // Use the customerId from the session
            
        ]));

        $newFeedback = Feedback::create($data);
    }

    public function viewFeedback()
    {
    // Retrieve all feedback entries
    $feedbacks = Feedback::all();

    // Return the feedback data as JSON
    return response()->json($feedbacks);
    }


}
