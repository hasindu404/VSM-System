<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    public function index(){
        $feedbacks = Feedback::all();
        return Inertia::render('Customers/Feedback', ['feedback' => $feedbacks]);
}
    // public function store(Request $request){
    //     $data=($request)->validate([
    //             // 'userid' => 'required',
    //             'servicetype' => 'required',
    //             'servicedate' => 'required|date',
    //             'discription' => 'required'
    //     ]);
            
    // // Check for authenticated user
    // if (auth()->check()) {
    //     $userid = auth()->id();
    //     Log::info('Authenticated user ID: ' . $userid);
    // } else {
    //     Log::warning('No authenticated user found. Appointment cannot be created.');
    //     return response()->json(['status' => 'error', 'message' => 'User not authenticated.'], 401);
    // }

    //     $userid = auth()->id();

    //      $feedback = Feedback::create(array_merge($data, [
    //         'userid' => $userid, // Use the customerId from the session
            
    //     ]));

    //     // $newFeedback = Feedback::create($data);

    //     return response()->json([
    //         'status' => 'success',
    //         'message' => 'Feedback submitted successfully!'
    //     ]);
       
    // }

    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'servicetype' => 'required|string',
            'servicedate' => 'required|date',
	        'discription' => 'required|string',

        
        ]);
        Log::info('Validated Data:', $validatedData);
        // Get the authenticated user's ID (customer ID)
        $userid = Auth::id();

   
        Log::info('User ID:', ['userid' => $userid]);


        // Add the customer ID to the validated data
        $data = array_merge($validatedData, ['userid' => $userid]);

        // Create a new record in the database
        Feedback::create($data);

        // Return a response or redirect as needed
        return response()->json([
            'status' => 'success',
            'message' => 'Thank you for your feedback! Your comments are valuable to us and will help us improve our services. We appreciate you taking the time to share your thoughts!'
        ]);
    }

        
    

    public function viewFeedback()
    {
    // Retrieve all feedback entries
    $feedbacks = Feedback::all();

    // Return the feedback data as JSON
    return response()->json($feedbacks);
    }


}
