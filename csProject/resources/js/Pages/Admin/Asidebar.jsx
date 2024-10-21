import React from 'react';
import { Link } from '@inertiajs/react';
import '@/Pages/Customer/Sidebar.css';
import { FaUser, FaClipboardList, FaCommentDots, FaSignOutAlt, FaClock } from 'react-icons/fa'; // Import the clock icon

export default function Sidebar() {
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link href={route('AdminDashboard')} className="nav-link">
                        <FaClipboardList style={{ color: 'gold', fontSize: '20px', marginRight: '8px' }} />
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href={route('UserManagement')} className="nav-link">
                        <FaUser style={{ color: 'blue', fontSize: '20px', marginRight: '8px' }} />
                        User Management
                    </Link>
                </li>
                <li>
                    <Link href="BusinessHours" className="nav-link"> {/* Adjust the URL according to your route */}
                        <FaClock style={{ color: 'orange', fontSize: '20px', marginRight: '8px' }} />
                        Business Hours
                    </Link>
                </li>
                <li>
                    <Link href="/feedback" className="nav-link">
                        <FaCommentDots style={{ color: 'green', fontSize: '20px', marginRight: '8px' }} />
                        Feedback
                    </Link>
                </li>
                <li>
                    <Link href="/logout" method="post" className="nav-link">
                        <FaSignOutAlt style={{ color: 'red', fontSize: '20px', marginRight: '8px' }} />
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    );
}
