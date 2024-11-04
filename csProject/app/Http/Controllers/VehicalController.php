<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Vehical;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicalController extends Controller
{
    public function index(){
        $vehicals = Vehical::all();
        return Inertia::render('Vehicle/VehicleRegistration',['vehicals'=> $vehicals]);
}
public function store(Request $request){
    $data = ($request) ->validate([
        'vehicalid'=> 'required',
        'brand'=> 'required',
        'year'=> 'required',
        'Catagory'=>'required',
        'last_service_date' => 'required',
        'colour'=>'required',
        'images'=>'required'
    ]);
    //file Haindling
    if($request->hasFile('images')){
        $filePath = $request->file('images')->store('uploads','public');
        $data['images'] = $filePath;
    }

    $newVehical = Vehical::create($data);

    return redirect(route('vehiclereg'));
}

public function edit(Vehical $vehical){
        return view('vehical.edit',['vehical'=> $vehical]);
}

public function update(Vehical $vehical,Request $request){
    $data = ($request) ->validate([
        'vehicalid'=> 'required',
        'brand'=> 'required',
        'year'=> 'required',
        'catagory'=>'required',
        'last_service_date' => 'required',
        'colour'=>'required',
    ]);
    $vehical->update($data);
    return redirect(route('vehical.vehimang'));
}

public function delete(Vehical $vehical){
    $vehical->delete();
    return redirect(route('vehical.vehimang'));
}

// public function getVehicalIds(Request $request)
// {
//     $userId = $request->user()->id; // Get the currently authenticated user's ID
//     $vehicals = Vehical::where('user_id', $userId)->get(['vehicalid']); // Get all vehical IDs for this user

//     return response()->json($vehicals);
// }

public function getVehicalIds(Request $request)
{
    try {
        $userId = $request->user()->id; // Ensure user is authenticated
        $vehicals = Vehical::where('user_id', $userId)->get(['vehicalid']); // Query for vehicle IDs

        return response()->json($vehicals); // Return response as JSON
    } catch (\Exception $e) {
        // Log the exception and return a JSON error response
        \Log::error('Error fetching vehicle IDs: ' . $e->getMessage());
        return response()->json(['error' => 'An error occurred while fetching vehicle IDs.'], 500);
    }
}

}
