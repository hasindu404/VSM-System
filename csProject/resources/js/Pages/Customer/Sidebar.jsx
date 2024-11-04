import React from 'react';
import { Link } from '@inertiajs/react';
import './Sidebar.css';
import {  FaCar, FaCalendarAlt, FaHistory, FaBell, FaCog, FaSignOutAlt, FaClipboardList  } from 'react-icons/fa';
import { FaCommentDots } from 'react-icons/fa';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link href="/vehiclereg" className="nav-link">
                        <FaCar style={{ color: 'blue', fontSize: '20px', marginRight: '8px' }} />
                        My Vehicles
                    </Link>
                </li>
                <li>
                    <Link href="/create" className="nav-link">
                        <FaCalendarAlt style={{ color: 'green', fontSize: '20px', marginRight: '8px' }} />
                        Add Appointments
                    </Link>
                </li>
                <li>
                    <Link href="/viewappointments" className="nav-link"> {/* New View Appointments link */}
                        <FaClipboardList style={{ color: 'orange', fontSize: '20px', marginRight: '8px' }} />
                        View Appointments
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
                    <Link href="/feedbacksub" className="nav-link"> {/* New Feedback link */}
                        <FaCommentDots style={{ color: 'teal', fontSize: '20px', marginRight: '8px' }} /> {/* Feedback icon */}
                        Feedback
                    </Link>
                </li>
                <li>
                    <Link href="/personal" className="nav-link">
                        <FaCog style={{ color: 'grey', fontSize: '20px', marginRight: '8px' }} />
                        Profile
                    </Link>
                </li>
                <li>
                    <Link href={route('logout')} method="post" as="button" className="nav-link">
                        <FaSignOutAlt style={{ color: 'red', fontSize: '20px', marginRight: '8px' }} />
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    );
}
