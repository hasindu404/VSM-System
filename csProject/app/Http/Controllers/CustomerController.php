<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;
use Inertia\Inertia;

class CustomerController extends Controller
{

    public function index(){
        $customers = Customer::all();
        return Inertia::render('Customer/Personalinfo', ['customer' => $customers]);
}
public function store(Request $request){

    $data = ($request) ->validate([
        'fname'=> 'required',
        'lname'=> 'required',
        'address'=> 'required',
        'contact'=>'required',
        'email' => 'required',
        'vehicleid'=>'required',
    ]);
    $newCustomer = Customer::create($data);

    return redirect(route('profile'));
}

public function edit(Customer $customer){
        return view('customer.edit',['customer'=> $customer]);
}

public function update(Customer $customer,Request $request){
    $data = ($request) ->validate([
        'fname'=> 'required',
        'lname'=> 'required',
        'address'=> 'required',
        'contact'=>'required',
        'email' => 'required',
        'vehicleid'=>'required',
    ]);
    $customer->update($data);
    return redirect(route('profile'));
}

public function delete(Customer $customer){
    $customer->delete();
    return redirect(route('customer.custmang'));
}
}
