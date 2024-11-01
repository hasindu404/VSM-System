import React from 'react';
import { Link } from '@inertiajs/react';
import '@/Pages/Customer/Sidebar.css';
import { FaTachometerAlt, FaCalendarCheck, FaFileInvoiceDollar } from 'react-icons/fa';

export default function ReceptionistSidebar() {
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link href="ReceptionistDashboard" className="nav-link">
                        <FaTachometerAlt style={{ color: 'gold', fontSize: '20px', marginRight: '8px' }} />
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="C:\Users\HP\Documents\GitHub\VSM-System\csProject\resources\js\Pages\Receptionist\AppointmentHandle.jsx" className="nav-link">
                        <FaCalendarCheck style={{ color: 'green', fontSize: '20px', marginRight: '8px' }} />
                        Appointment Handling
                    </Link>
                </li>
                <li>
                    <Link href="/billing" className="nav-link">
                        <FaFileInvoiceDollar style={{ color: 'blue', fontSize: '20px', marginRight: '8px' }} />
                        Billing
                    </Link>
                </li>
            </ul>
        </div>
    );
}
