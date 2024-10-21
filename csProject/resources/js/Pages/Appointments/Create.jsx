import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Sidebar from '../Customer/Sidebar';  // Relative path to Sidebar.jsx
import Header from '../Customer/Header';    // Relative path to Header.jsx
import React, { useEffect, useState } from 'react';

// Import Toastify components
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateAppointment() {
    const { data, setData, post, processing, errors, reset } = useForm({
        customerID: '',
        appointmentStatus: '',
        serviceType: '',
        appointmentDate: '',
        employerType: 'Customer', // Fixed as 'Customer'
        timeSlot: '',
    });

    const [minDate, setMinDate] = useState('');
    const [minTime, setMinTime] = useState('');

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setMinDate(today);
        updateMinTime(today);
    }, []);

    // Update minimum time based on selected date
    const updateMinTime = (selectedDate) => {
        const now = new Date();
        const selected = new Date(selectedDate);

        // Check if the selected date is today
        if (selected.toDateString() === now.toDateString()) {
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            setMinTime(`${hours}:${minutes}`); // Allow only current or future time
        } else {
            // If the selected date is in the future, allow any time
            setMinTime('00:00'); // Reset minimum time to allow any time selection
        }
    };

    // Handle date change
    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setData('appointmentDate', newDate);
        updateMinTime(newDate);

        // Reset time if it's now invalid (only check if it's today)
        if (newDate === minDate && data.timeSlot < minTime) {
            setData('timeSlot', ''); // Reset timeSlot if it's invalid
        }
    };

    const submit = (e) => {
        e.preventDefault();
    
        post(route('appointments'), 
            {
                appointmentStatus: data.appointmentStatus,
                serviceType: data.serviceType,
                appointmentDate: data.appointmentDate,
                timeSlot: data.timeSlot,
            },
            {
                onSuccess: () => {
                    toast.success('Appointment created successfully!');
                    reset('appointmentStatus', 'serviceType', 'appointmentDate', 'timeSlot');
                },
                onError: (error) => {
                    // Log the error to ensure we're getting the response
                    console.log(error.response); // Add this line to inspect the error in your browser's console
                    
                    // Check if we received a valid error response from the server
                    const errorType = error?.response?.data?.errorType;
                    const message = error?.response?.data?.message || 'An error occurred. Please try again.';
    
                    // Handle different error types separately
                    if (errorType === 'business_day') {
                        toast.error('Business is closed on this day.');
                    } else if (errorType === 'business_hours') {
                        toast.error('Appointment time is outside of business hours.');
                    } else {
                        toast.error(message);
                    }
                }
            }
        );
    };
    
    

    return (
        <GuestLayout>
        <Header/>
        <Sidebar/>
            <Head title="Create Appointment" />
            <ToastContainer position="top-right" autoClose={5000} />

            <form onSubmit={submit} className="max-w-md mx-auto mt-8">
                <div>
                    <InputLabel htmlFor="customerID" value="Customer ID" />
                    <TextInput
                        id="customerID"
                        name="customerID"
                        value={data.customerID}
                        className="mt-1 block w-full"
                        autoComplete="customerID"
                        onChange={(e) => setData('customerID', e.target.value)}
                        required
                    />
                    <InputError message={errors.customerID} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="appointmentStatus" value="Appointment Status" />
                    <TextInput
                        id="appointmentStatus"
                        name="appointmentStatus"
                        value={data.appointmentStatus}
                        className="mt-1 block w-full"
                        autoComplete="appointmentStatus"
                        onChange={(e) => setData('appointmentStatus', e.target.value)}
                        required
                    />
                    <InputError message={errors.appointmentStatus} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="serviceType" value="Service Type" />
                    <select
                        id="serviceType"
                        name="serviceType"
                        value={data.serviceType}
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        onChange={(e) => setData('serviceType', e.target.value)}
                        required
                    >
                        <option value="">Select a service type</option>
                        <option value="Full Service">Full Service</option>
                        <option value="Normal Service">Normal Service</option>
                    </select>
                    <InputError message={errors.serviceType} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="appointmentDate" value="Appointment Date" />
                    <TextInput
                        id="appointmentDate"
                        type="date"
                        name="appointmentDate"
                        value={data.appointmentDate}
                        className="mt-1 block w-full"
                        autoComplete="appointmentDate"
                        onChange={handleDateChange} // Update to use handleDateChange
                        min={minDate} // Set minimum date
                        required
                    />
                    <InputError message={errors.appointmentDate} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="employerType" value="Employer Type" />
                    <TextInput
                        id="employerType"
                        name="employerType"
                        value={data.employerType}
                        className="mt-1 block w-full bg-gray-100"
                        autoComplete="employerType"
                        readOnly
                    />
                    <InputError message={errors.employerType} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="timeSlot" value="Time Slot" />
                    <TextInput
                        id="timeSlot"
                        name="timeSlot"
                        type="time"
                        value={data.timeSlot}
                        className="mt-1 block w-full"
                        autoComplete="timeSlot"
                        onChange={(e) => setData('timeSlot', e.target.value)}
                        min={minTime} // Set minimum time
                        required
                    />
                    <InputError message={errors.timeSlot} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('CustomerDashboard')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Go to Dashboard
                    </Link>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Create Appointment
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
