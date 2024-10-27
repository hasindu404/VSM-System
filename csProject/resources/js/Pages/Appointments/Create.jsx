import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Sidebar from '../Customer/Sidebar';  
import Header from '../Customer/Header';   
import React, { useEffect, useState } from 'react';
import axios from 'axios';


// Import Toastify components
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateAppointment() {
    const { data, setData, post, processing, errors, reset } = useForm({
        appointmentStatus: '',
        serviceType: '',
        appointmentDate: '',
        employerType: 'Customer',
        appointmentTime: '',
    });

    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [minTime, setMinTime] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]); // **New state for available time slots**
    const [bookedTimes, setBookedTimes] = useState([]); // **New state for booked times**

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7); 
        const formattedMaxDate = nextWeek.toISOString().split('T')[0];
        
        setMinDate(today);
        setMaxDate(formattedMaxDate);
    }, []);

    // **New function to fetch business hours for the selected date**
    // const fetchBusinessHours = async (dayOfWeek) => {
    //     try {
    //         const response = await axios.get`/business-hours/${dayOfWeek}`, {}, {
                
    //             onSuccess: (page) => {
    //                 return page.props.businessHours; // Assuming the response includes business hours in the props
    //             },
    //         });
    //         return response; // Return the business hours from the response
    //     } catch (error) {
    //         console.error('Error fetching business hours:', error);
    //         return null;
    //     }
    // };

    const fetchBusinessHours = async (dayOfWeek) => {
        try {
            const response = await axios.get(`/business-hours/${dayOfWeek}`);
            return response.data;
            
            // Assuming the response includes business hours in the data
            

            // return console.log(response.data.businessHours); // Return the business hours from the response
             
             
        } catch (error) {
            // console.error('Error fetching business hours:', error);
            // return null; // Return null in case of an error
            // Handle error appropriately
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Error fetching business hours:', error.response.status, error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Error:', error.message);
        }
        return null; // Return null or handle the error accordingly
        }
    };
    
   
    
    

    // **New function to fetch booked times for the selected date**
    // const fetchBookedTimes = async (selectedDate) => {
    //     console.log("Fetching booked times for date:", selectedDate);
    //     try {
    //         // Make an Inertia GET request to fetch booked times for the selected date
    //         console.log("line61");
    //         Inertia.get(`/booked-times/${selectedDate}`, {}, {
    //             // preserveState: true, // Keep the state while loading
    //             onSuccess: (page) => {
    //                 // console.log("Response from Inertia:", response); 
    //                 console.log("Received appointment times:", page.props.appointmentTimes);
    //                 // Assuming the response includes booked times in the props
    //                 // setBookedTimes(page.props.appointmentTimes);
    //             },
    //         });
            
    //     } catch (error) {
    //         console.error('Error fetching booked times:', error);
    //         console.log('Error details:', error.response ? error.response.data : 'No response data');
    //     }
    // };
   
    const fetchBookedTimes = async (selectedDate) => {
        try {
            const response = await axios.get(`/booked-times/${selectedDate}`);
            console.log(response.data.appointmentTimes);
            setBookedTimes(response.data.appointmentTimes);
            
            console.log(response);
        } catch (error) {
            console.error('Error fetching booked times:', error);
        }
    };

    
    // **Generate available time slots based on business hours and step**
    const generateAvailableTimes = (openingTime, closingTime, step) => {
        const times = [];
        const [openHour, openMinute] = openingTime.split(':');
        const [closeHour, closeMinute] = closingTime.split(':');

        let currentTime = new Date();
        currentTime.setHours(openHour, openMinute);

        const endTime = new Date();
        endTime.setHours(closeHour, closeMinute);

        // Create time slots based on step interval
        while (currentTime < endTime) {
            const timeString = currentTime.toTimeString().slice(0, 5); // Format as HH:mm
            if (!bookedTimes.includes(timeString)) { // **Exclude booked times**
                console.log(!bookedTimes);
                times.push(timeString);
            }
            currentTime.setMinutes(currentTime.getMinutes() + step);
        }
        console.log("kine128")
        console.log(times);
        setAvailableTimes(times); // Update available times in the state
        
    };

    const handleDateChange = async (e) => {
        const newDate = e.target.value;
        setData('appointmentDate', newDate);


        const dayOfWeek = new Date(newDate).toLocaleDateString('en-US', { weekday: 'long' });
        console.log("140");
        

        // **Fetch business hours and booked times for the selected date**
        const businessHours = await fetchBusinessHours(dayOfWeek);
        // console.log("145");
        // console.log(businessHours);
        await fetchBookedTimes(newDate); // **Fetch booked times**
        console.log(businessHours);
        console.log(bookedTimes);
        if (businessHours) {
            generateAvailableTimes(businessHours.openingTime, businessHours.closingTime, businessHours.step); // **Generate times based on business hours**
            console.log("line156");
        } else {
            setAvailableTimes([]); // Reset available times if the business is closed
        }

        updateMinTime(newDate);
    };

    // **No major changes here**
    const updateMinTime = (selectedDate) => {
        const now = new Date();
        const selected = new Date(selectedDate);

        if (selected.toDateString() === now.toDateString()) {
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            setMinTime(`${hours}:${minutes}`);
        } else {
            setMinTime('00:00');
        }
    };

    const submit = (e) => {
        e.preventDefault();
<<<<<<< Updated upstream

        post(route('appointments.store'), {
          onSuccess: (page) => {
            if (page.props.flash.success) {
              toast.success(page.props.flash.success);
            } else if (page.props.flash.error) {
              toast.error(page.props.flash.error);
            }
          },
        });
      };


=======
    
        post(route('appointments'), 
            {
                appointmentStatus: data.appointmentStatus,
                serviceType: data.serviceType,
                appointmentDate: data.appointmentDate,
                appointmentTime: data.appointmentTime,
            },
            {
                onSuccess: () => {
                    toast.success('Appointment created successfully!');
                    reset('appointmentStatus', 'serviceType', 'appointmentDate', 'appointmentTime');
                },
                
            }
        );
    };
>>>>>>> Stashed changes

    return (
        <GuestLayout>
            <Header />
            <Sidebar />
            <Head title="Create Appointment" />
            <ToastContainer position="top-right" autoClose={5000} />

            <form onSubmit={submit} className="max-w-md mx-auto mt-8">
                

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
                        className="mt-1 block w-full"
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
                        onChange={handleDateChange}
                        min={minDate}
                        max={maxDate}
                        required
                    />
                    <InputError message={errors.appointmentDate} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="appointmentTime" value="Appointment Time" />
                    <select
                        id="appointmentTime"
                        name="appointmentTime"
                        value={data.appointmentTime}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('appointmentTime', e.target.value)}
                        required
                    >
                        <option value="">Select a time</option>
                        {availableTimes.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))}
                    </select>
                    <InputError message={errors.appointmentTime} className="mt-2" />
                </div>

                <div className="mt-4">
                    <PrimaryButton disabled={processing}>
                        {processing ? 'Creating...' : 'Create Appointment'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
