import React from 'react';
import { useForm } from '@inertiajs/react';

export default function BusinessHoursForm() {
    const { data, setData, put, processing, errors, reset, recentlySuccessful } = useForm({
        dayOfWeek: '',
        is_open: '1',
        opening_time: '',
        closing_time: '',
        step: 1,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('business.hours.update', { dayOfWeek: data.dayOfWeek }), {
            data: {
                is_open: data.is_open,
                opening_time: data.opening_time,
                closing_time: data.closing_time,
                step: data.step,
            },
            onSuccess: () => reset(),
        });
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
                    <label htmlFor="is_open" className="block text-gray-700">Is Open</label>
                    <select
                        id="is_open"
                        name="is_open"
                        value={data.is_open}
                        onChange={(e) => setData('is_open', e.target.value)}
                        className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                        required
                    >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                    {errors.is_open && <div className="text-red-600 mt-2">{errors.is_open}</div>}
                </div>

                {/* Opening Time */}
                <div className="mb-4">
                    <label htmlFor="opening_time" className="block text-gray-700">Opening Time</label>
                    <input
                        id="opening_time"
                        type="time"
                        name="opening_time"
                        value={data.opening_time}
                        onChange={(e) => setData('opening_time', e.target.value)}
                        className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                        required
                    />
                    {errors.opening_time && <div className="text-red-600 mt-2">{errors.opening_time}</div>}
                </div>

                {/* Closing Time */}
                <div className="mb-4">
                    <label htmlFor="closing_time" className="block text-gray-700">Closing Time</label>
                    <input
                        id="closing_time"
                        type="time"
                        name="closing_time"
                        value={data.closing_time}
                        onChange={(e) => setData('closing_time', e.target.value)}
                        className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                        required
                    />
                    {errors.closing_time && <div className="text-red-600 mt-2">{errors.closing_time}</div>}
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
        </div>
    );
}
