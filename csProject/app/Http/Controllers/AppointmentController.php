<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth; 
use App\Models\Appointment;
use App\Models\BusinessHour;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AppointmentController extends Controller
{
   
    public function store(Request $request)
    {
        Log::info('Start of store method');

          // Log session data to check if customerID is present
        Log::info('Session data: ', session()->all());

        // Validate the request data first
        $validatedData = $request->validate([
            'appointmentStatus' => 'required|string',
            'serviceType' => 'required|string',
            'appointmentDate' => 'required|date',
            'appointmentTime' => 'required|string', // Initial validation
        ]);

        // Check for authenticated user
    if (auth()->check()) {
        $customerID = auth()->id();
        Log::info('Authenticated user ID: ' . $customerID);
    } else {
        Log::warning('No authenticated user found. Appointment cannot be created.');
        return response()->json(['status' => 'error', 'message' => 'User not authenticated.'], 401);
    }


        // $customerID = session('customerID'); // Assuming you stored it as 'customerID'
        //  Log::info('Customer ID from session: ' . $customerID);

        $customerID = auth()->id();

    
    
        // Proceed to create the appointment if valid
        $appointment = Appointment::create(array_merge($validatedData, [
            'customerID' => $customerID, // Use the customerId from the session
            'isFinished' => 'notFinished',
            'employerType' => 'customer', // Automatically set employerType to 'customer'
        ]));

        Log::info(request()->all());

    
        // return redirect()->route('appointments')->with('success', 'Appointment created successfully!');
        // return response()->json(['success' => true, 'message' => 'Appointment created successfully!']);
        // 
        return response()->json([
            'status' => 'success',
            'message' => 'Appointment created successfully!'
        ]);
        // return back()->with('success', 'Appointment created successfully!');
    }
    
    private function generateAvailableTimes($openingTime, $closingTime, $step)
    {
        $times = [];
        $start = Carbon::createFromTimeString($openingTime);
        $end = Carbon::createFromTimeString($closingTime);
    
        while ($start->lt($end)) {
            $times[] = $start->format('H:i');
            $start->addMinutes($step);
        }
    
        return $times;
    }
    
    public function getAvailableTimes(Request $request)
    {
        $appointmentDate = $request->input('appointmentDate');
        $dayOfWeek = Carbon::parse($appointmentDate)->dayOfWeek;

        // Fetch business hours for the day
        $businessHours = BusinessHour::where('day_of_week', $dayOfWeek)->first();
        
        if ($businessHours) {
            // Generate available times
            $availableTimes = $this->generateAvailableTimes($businessHours->opening_time, $businessHours->closing_time, $businessHours->step);
            
            // Fetch booked times for the selected date
            $bookedTimes = Appointment::where('appointment_date', $appointmentDate)
                                       ->pluck('appointment_time')
                                       ->map(function($time) {
                                           return Carbon::parse($time)->format('H:i');
                                       })
                                       ->toArray();
            
            // Filter out booked times from available times
            $availableTimes = array_diff($availableTimes, $bookedTimes);
            
            return response()->json($availableTimes);
        }

        return response()->json([]);
    }

    public function getBookedTimes($selectedDate) {
        // Check if there are any appointments
        $appointments = Appointment::where('appointmentDate', $selectedDate)->get();
    
        if ($appointments->isEmpty()) {
            // Handle the case where no appointments exist
            return response()->json([
                'appointmentTimes' => [], // Return a specific value indicating no appointments
            ]);
        }
    
        // Proceed to get appointment times if appointments exist
        $appointmentTimes = $appointments->pluck('appointmentTime');

        // Return the appointment times to the front end
        return response()->json([
            'appointmentTimes' => $appointmentTimes,
        ]);
    }

    public function index(Request $request)
{
    Log::info('Request received at appointmenthandle');
    $date = $request->input('date');
    $appointments = Appointment::query();

    if ($date === 'today') {
        $appointments->whereDate('appointmentDate', Carbon::today());
    } elseif ($date === 'tomorrow') {
        $appointments->whereDate('appointmentDate', Carbon::tomorrow());
    } elseif ($date === 'after') {
        $appointments->where('appointmentDate', '>', Carbon::tomorrow());
    }

    return response()->json($appointments->get());
}

public function finish($id)
{
    Log::info("Finishing appointment with ID: $id");
    $appointment = Appointment::findOrFail($id);
    $appointment->isFinished = true; // Assuming this field exists
    $appointment->save();

    return response()->json(['success' => true]);
}


}    