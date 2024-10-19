import React from 'react';
import { Link } from '@inertiajs/react';
import './Sidebar.css';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link href="/dashboard" className="nav-link">Dashboard</Link>
                </li>
                <li>
                    <Link href="/vehicles" className="nav-link">My Vehicles</Link>
                </li>
                <li>
                    <Link href="/appointments" className="nav-link">Appointments</Link>
                </li>
                <li>
                    <Link href="/service-history" className="nav-link">Service History</Link>
                </li>
                <li>
                    <Link href="/reminders" className="nav-link">Reminders</Link>
                </li>
                <li>
                    <Link href="/settings" className="nav-link">Settings</Link>
                </li>
                <li>
                    <Link href="/logout" className="nav-link">Logout</Link>
                </li>
            </ul>
        </div>
    );
}
