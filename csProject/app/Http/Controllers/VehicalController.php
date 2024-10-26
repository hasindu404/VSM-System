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
        return Inertia::render('vehical/vehimang',['vehical'=> $vehicals]);
}
public function store(Request $request){
    $data = ($request) ->validate([
        'vehicalid'=> 'required',
        'brand'=> 'required',
        'year'=> 'required',
        'catagory'=>'required',
        'last_service_date' => 'required|date',
        'colour'=>'required',
    ]);
    $newVehical = Vehical::create($data);

    return redirect(route('vehical.index'));
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
