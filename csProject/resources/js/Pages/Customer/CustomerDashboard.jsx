import React from 'react';
import Sidebar from './Sidebar'; // Import Sidebar component
import './CustomerDashboard.css'; // Import Dashboard-specific CSS
import Header from './Header'; // Import the Header component
import { usePage } from '@inertiajs/react';

export default function Dashboard() {
    const user=usePage().props.auth.user;

    return (

        <div className="dashboard-container">
             {/* Header Component */}
            <Header />
            <Sidebar />
            <div className="content-area">
                <h1>Dashboard</h1>
                <p>Welcome</p>{user.name}
                {/* Add other dashboard-specific content here */}
            </div>
        </div>

    );
}
