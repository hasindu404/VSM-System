import React from 'react';
import Sidebar from './Sidebar'; // Import Sidebar component
import './CustomerDashboard.css'; // Import Dashboard-specific CSS
import Header from './Header'; // Import the Header component
import { usePage } from '@inertiajs/react';
import vehicleImage from "../../assets/vehicle-management.png"; // Go up two directories


export default function Dashboard() {
    const user = usePage().props.auth.user;

    return (
        <div className="dashboard-container">
            {/* Header Component */}
            <Header />
            <Sidebar />
            <div className="content-area flex items-center">
                <img src={vehicleImage} alt="Vehicle Management" className="welcome-image w-1/2" />
                <div className="ml-4">
                    <h1 className="text-4xl font-bold">Hi, {user.name}!</h1>
                    <p className="text-lg">Welcome to your gateway of streamlined vehicle management—where every journey counts!</p>
                </div>
            </div>
        </div>
    );
}
