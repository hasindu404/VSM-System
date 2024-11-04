import React from 'react';
import Rsidebar from './Rsidebar';
import './ReceptionDashboard.css'; // Import Dashboard-specific CSS
import Rheader from './Rheader'; // Import the Header component
import { usePage } from '@inertiajs/react';

export default function Dashboard() {
    const user=usePage().props.auth.user;

    return (

        <div className="dashboard-container">
             {/* Header Component */}
            <Rheader/>
            <Rsidebar />
            <div className="content-area">
                <h1>Dashboard</h1>
                <p>Welcome</p>{user.name}
                {/* Add other dashboard-specific content here */}
            </div>
        </div>

    );
}
