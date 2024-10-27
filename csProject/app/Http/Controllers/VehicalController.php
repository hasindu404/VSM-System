<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Vehical;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicalController extends Controller
{
    public function index(){
        $vehical = Vehical::all();
        return Inertia::render('Vehicle/VehicleRegistration',['vehicals'=> $vehical]);
}
public function store(Request $request){
    $data = $request ->validate([
        'vehicalid'=> 'required',
        'brand'=> 'required',
        'year'=> 'required',
        'Catagory'=>'required',
        'last_service_date' => 'required|date',
        'colour'=>'required',
        'images'=>'required|image'
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
}
