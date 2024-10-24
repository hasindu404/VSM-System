import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import GuestLayout from "@/Layouts/GuestLayout";
import PrimaryButton from "@/Components/PrimaryButton";


export default function Personalinfo(){
    const {data, setData, post, processing, errors, reset} = useForm({
            fname: '',
            lnamee: '',
            address: '',
            contact: '',
            email: '',
            vehicleid: ''
    });
    const submit = (e) =>{
        e.preventDefault();
            post(route('customers.store'));
    };
        return(
                <GuestLayout>
                <Header/>
                <Sidebar/>
                    <Head title="Personal information"/>
                    <ToastContainer position="top-right" autoClose={5000}/>
                    <form onSubmit={submit} className="max-2-md mx-auto mt-8">
                        <div>
                            <InputLabel htmlFor="fname" value="First Name"/>
                            <TextInput
                                id="fname"
                                name="fname"
                                value={data.fname}
                                className="mt-1 block w full"
                                autoComplete="fname"
                                onChange={(e)=> setData('fname',e.target.value)}
                                required/>

                        </div>
                        <div>
                            <InputLabel htmlFor="lname" value="Last Name"/>
                            <TextInput
                                id="lname"
                                name="lname"
                                value={data.lname}
                                className="mt-1 block w full"
                                autoComplete="lname"
                                onChange={(e)=> setData('lname',e.target.value)}
                                required/>

                        </div>
                        <div>
                            <InputLabel htmlFor="address" value="Address"/>
                            <TextInput
                                id="address"
                                name="address"
                                value={data.address}
                                className="mt-1 block w full"
                                autoComplete="address"
                                onChange={(e)=> setData('address',e.target.value)}
                                required/>
                        </div>
                        <div>
                            <InputLabel htmlFor="contact" value="Contact No:"/>
                            <TextInput
                                id="contact"
                                name="contact"
                                value={data.contact}
                                className="mt-1 block w full"
                                autoComplete="contact"
                                onChange={(e)=> setData('contact',e.target.value)}
                                required/>
                        </div>
                        <div>
                            <InputLabel htmlFor="email" value="Email"/>
                            <TextInput
                                id="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w full"
                                autoComplete="email"
                                onChange={(e)=> setData('email',e.target.value)}
                                required/>
                        </div>
                        <div>
                            <InputLabel htmlFor="vehicleid" value="Vehical Id"/>
                            <TextInput
                                id="vehicleid"
                                name="vehicleid"
                                value={data.vehicleid}
                                className="mt-1 block w full"
                                autoComplete="vehicleid"
                                onChange={(e)=> setData('vehicleid',e.target.value)}
                                required/>
                        </div>

                        <div className="mt-4 flex items-center justify-end">
                            <Link
                                href={route('CustomerDashboard')}
                                className ="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" >
                                Go to Dashboard
                            </Link>
                            <PrimaryButton className="ms-4" disabled={processing}>
                                Submit
                            </PrimaryButton>
                        </div>

                    </form>
                </GuestLayout>
        );
}
