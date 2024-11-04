import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';


export default function Feedback(){

    const{data,setData,post,processing}=useForm({
        servicetype:'',
        servicedate:'',
        description:''
    });

    // const submit = (e) =>{
    //     e.preventDefault();
    //         post(route('feedback.store'),{
    //             onSuccess:()=>{
    //                 onSuccess();
    //                 setData({servicetype:'',servicedate:'',description:''})
    //             }
    //         })
    // }

    const submit = async (e) => {
        e.preventDefault();

       
        try {
           
            const requestData = {
                servicetype: data.servicetype,
                servicedate: data.servicedate,
                discription: data.discription,
               
            };
        
            console.log('Request data:', requestData); // Log the data being sent
        
            const response = await axios.post(`/feedback`, requestData);
            console.log('Inertia Response:', response);
            console.log(response.data.status);
            if (response.data.status === 'success') {
                toast.success(response.data.message); // Show success toast
                setData({ servicetype: '', servicedate: '', discription: '' }); // Reset the form
            } else {
                toast.error('Failed to create appointment. Please try again.'); // Handle unexpected response
            }
        } catch (error) {
            toast.error('Failed to create appointment. Please try again.'); // Show error toast
            console.error('Error details:', error); // Log the error details
        }
    };


    return(
        <GuestLayout>
            <Header/>
            <Sidebar/>
                <Head title="Feedback"/>
                <ToastContainer position="top-right" autoClose={5000}/>
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Feedback</h1>
                <form onSubmit={submit} className="max-2-md mx-auto mt-8">
                <div className="mt-4">
                    <InputLabel htmlFor="servicedate" value="Service Date"/>
                    <TextInput
                        id="servicedate"
                        type="date"
                        name="servicedate"
                        value={data.servicedate}
                        className="mt-1 block w-full"
                        autoComplete="servicedate"
                        onChange={(e)=>setData('servicedate',e.target.value)}
                        required
                    />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="servicetype" value="Service Type"/>
                    <select
                        id="servicetype"
                        name="servicetype"
                        value={data.servicetype}
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        onChange={(e) => setData('servicetype',e.target.value)}
                        required
                    >
                        <option value="">Select a service type</option>
                        <option value="Full Service">Full Service</option>
                        <option value="Normal Service">Normal Service</option>
                    </select>
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="discription" value="Description"/>
                    <textarea
                        rows={4}
                        cols={40}
                        id="discription"
                        type="text"
                        name="discription"
                        value={data.discription}
                        className="mt-1 block w-full"
                        autoComplete="discription"
                        onChange={(e)=>setData('discription',e.target.value)}
                        required
                    />
                </div>
                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('CustomerDashboard')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Go to Dashboard
                    </Link>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Submit Feedback
                    </PrimaryButton>
                </div>
                </form>
        </GuestLayout>
    );

}
