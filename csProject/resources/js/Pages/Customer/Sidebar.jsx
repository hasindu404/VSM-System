import React from 'react';
import { Link } from '@inertiajs/react';
import './Sidebar.css';
import { FaBeer, FaCar, FaCalendarAlt, FaHistory, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link href="CustomerDashboard" className="nav-link">
                        <FaBeer style={{ color: 'gold', fontSize: '20px', marginRight: '8px' }} />
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/vehiclereg" className="nav-link">
                        <FaCar style={{ color: 'blue', fontSize: '20px', marginRight: '8px' }} />
                        My Vehicles
                    </Link>
                </li>
                <li>
                    <Link href="/create" className="nav-link">
                        <FaCalendarAlt style={{ color: 'green', fontSize: '20px', marginRight: '8px' }} />
                        Appointments
                    </Link>
                </li>
                <li>
                    <Link href="/service" className="nav-link">
                        <FaHistory style={{ color: 'purple', fontSize: '20px', marginRight: '8px' }} />
                        Service History
                    </Link>
                </li>
                <li>
                    <Link href="/reminders" className="nav-link">
                        <FaBell style={{ color: 'orange', fontSize: '20px', marginRight: '8px' }} />
                        Reminders
                    </Link>
                </li>
                <li>
                    <Link href="/personal" className="nav-link">
                        <FaCog style={{ color: 'grey', fontSize: '20px', marginRight: '8px' }} />
                        Profile
                    </Link>
                </li>
                <li>
                    <Link href={route('logout')} method="post"  className="nav-link">
                        <FaSignOutAlt style={{ color: 'red', fontSize: '20px', marginRight: '8px' }} />
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    );
}
