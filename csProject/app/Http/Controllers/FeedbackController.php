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
                'servicetype' => 'required',
                'servicedate' => 'required|date',
                'description' => 'required'
        ]);
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
