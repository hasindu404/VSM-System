import React from 'react';
import { useForm } from '@inertiajs/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BusinessHoursForm() {
    const { data, setData, put, processing, errors, reset, recentlySuccessful } = useForm({
        dayOfWeek: '',
        isOpen: '1',
        openingTime: '',
        closingTime: '',
        step: 60,
    });

    const submit = (e) => {
        e.preventDefault();
       
        // Construct the payload
    const payload = {
        isOpen: data.isOpen,
        step: data.step,
    };

      // Conditionally add times only if isOpen is true
      if (data.isOpen === '1') {
        payload.openingTime = data.openingTime;
        payload.closingTime = data.closingTime;
    }

    // Log the payload to the console
    console.log('Submitting data:', payload);

    // Send the PUT request
    put(route('business.hours.update', { dayOfWeek: data.dayOfWeek }), {
        data: payload,
        onSuccess: () => {
            reset(),
            toast.success('Business hours updated successfully!');
        } // Reset form or state on success
    });
        // put(route('business.hours.update', { dayOfWeek: data.dayOfWeek }), {
        //     data: {
        //         isOpen: data.isOpen,
        //         openingTime: data.openingTime,
        //         closingTime: data.closingTime,
        //         step: data.step,
        //     },
        //     onSuccess: () => reset(),
        // });

    //     try {
           
    //         const requestData = {
    //             servicetype: data.servicetype,
    //             servicedate: data.servicedate,
    //             discription: data.discription,
               
    //         };
        
    //         console.log('Request data:', requestData); // Log the data being sent
        
    //         const response = await axios.post(`/feedback`, requestData);
    //         console.log('Inertia Response:', response);
    //         console.log(response.data.status);
    //         if (response.data.status === 'success') {
    //             toast.success(response.data.message); // Show success toast
    //             setData({ servicetype: '', servicedate: '', discription: '' }); // Reset the form
    //         } else {
    //             toast.error('Failed to create appointment. Please try again.'); // Handle unexpected response
    //         }
    //     } catch (error) {
    //         toast.error('Failed to create appointment. Please try again.'); // Show error toast
    //         console.error('Error details:', error); // Log the error details
    //     }
    // };
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Manage Business Hours</h1>
            <form onSubmit={submit}>
                {/* Success Message */}
                {recentlySuccessful && (
                    <div className="alert success bg-green-100 text-green-800 p-4 rounded mb-4">
                        Business hours updated successfully!
                    </div>
                )}

                {/* Day Selection */}
                <div className="mb-4">
                    <label htmlFor="day" className="block text-gray-700">Select Day</label>
                    <select
                        id="day"
                        name="dayOfWeek"
                        value={data.dayOfWeek}
                        onChange={(e) => setData('dayOfWeek', e.target.value)}
                        className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                        required
                        
                    >
                        <option value="">--Select Day--</option>
                        <option value="Sunday">Sunday</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                    </select>
                    {errors.day && <div className="text-red-600 mt-2">{errors.day}</div>}
                </div>

                {/* Is Open Selection */}
                <div className="mb-4">
                    <label htmlFor="isOpen" className="block text-gray-700">Is Open</label>
                    <select
                        id="isOpen"
                        name="isOpen"
                        value={data.isOpen}
                        onChange={(e) => setData('isOpen', e.target.value)}
                        className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                        required
                    >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                    {errors.isOpen && <div className="text-red-600 mt-2">{errors.isOpen}</div>}
                </div>

                {/* Opening Time */}
                <div className="mb-4">
                    <label htmlFor="openingTime" className="block text-gray-700">Opening Time</label>
                    <input
                        id="openingTime"
                        type="time"
                        name="openingTime"
                        value={data.openingTime}
                        onChange={(e) => setData('openingTime', e.target.value)}
                        className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                        required
                    />
                    {errors.openingTime && <div className="text-red-600 mt-2">{errors.openingTime}</div>}
                </div>

                {/* Closing Time */}
                <div className="mb-4">
                    <label htmlFor="closingTime" className="block text-gray-700">Closing Time</label>
                    <input
                        id="closingTime"
                        type="time"
                        name="closingTime"
                        value={data.closingTime}
                        onChange={(e) => setData('closingTime', e.target.value)}
                        className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                        required
                    />
                    {errors.closingTime && <div className="text-red-600 mt-2">{errors.closingTime}</div>}
                </div>

                {/* Step Interval */}
                <div className="mb-4">
                    <label htmlFor="step" className="block text-gray-700">Step (minutes)</label>
                    <input
                        id="step"
                        type="number"
                        name="step"
                        min="1"
                        value={data.step}
                        onChange={(e) => setData('step', e.target.value)}
                        className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                        required
                    />
                    {errors.step && <div className="text-red-600 mt-2">{errors.step}</div>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    disabled={processing}
                >
                    {processing ? 'Updating...' : 'Update Hours'}
                </button>
            </form>
            <ToastContainer /> {/* Include ToastContainer here */}
        </div>
    );
}
