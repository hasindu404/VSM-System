import React from 'react';
import Sidebar from './Sidebar'; // Import Sidebar component
import './CustomerDashboard.css'; // Import Dashboard-specific CSS
import Header from './Header'; // Import the Header component

export default function Dashboard() {
    return (
        <div className="dashboard-container">
             {/* Header Component */}
            <Header />
            <Sidebar /> 
            <div className="content-area">
                <h1>Dashboard</h1>
                <p>Welcome to Customer dashboard! Here you can manage your vehicles, appointments, and more.</p>
                {/* Add other dashboard-specific content here */}
            </div>
        </div>
    );
}
