import React from 'react';
import Asidebar from './Asidebar';
import Aheader from './Aheader';
import BusinessHoursForm from '@/Components/BusinessHoursForm';
import '@/Pages/Customer/CustomerDashboard.css';

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <Aheader />
            <Asidebar />
            <div className="content-area">
                <BusinessHoursForm /> {/* Include the BusinessHoursForm component here */}
            </div>
        </div>
    );
}
