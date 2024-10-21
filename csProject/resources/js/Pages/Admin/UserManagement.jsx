import React from 'react';
import Asidebar from './Asidebar';
import '@/Pages/Customer/CustomerDashboard.css'; // Import Dashboard-specific CSS
import Aheader from './Aheader'; 

export default function Dashboard() {
    return (
        <div className="dashboard-container">
             
            <Aheader />
            <Asidebar /> 
            <div className="content-area">
                <h1>Dashboard</h1>
                <p>Welcome to User Management</p>
                {/* Add other dashboard-specific content here */}
            </div>
        </div>
    );
}
