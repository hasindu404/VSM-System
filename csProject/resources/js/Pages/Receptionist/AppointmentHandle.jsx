import React from 'react';
import Rsidebar from '@/Pages/Receptionist/Rsidebar';
import Rheader from '@/Pages/Receptionist/Rheader';

export default function AppointmentHandling() {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Rsidebar />

            {/* Main Content */}
            <div className="flex-1 p-4">
                {/* Header */}
                <Rheader />

                {/* Appointment Handling Buttons */}
                <div className="mt-4 flex justify-around items-center space-x-4 border border-red-500">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Today
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Tomorrow
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        After
                    </button>
                </div>

                {/* Table Section */}
                <div className="mt-6 bg-white rounded shadow p-4">
                    {/* This is where you would include the table component */}
                    <p className="text-gray-500">Table content goes here...</p>
                </div>
            </div>
        </div>
    );
}
