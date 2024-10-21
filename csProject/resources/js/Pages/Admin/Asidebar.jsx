import React from 'react';
import { Link } from '@inertiajs/react';
import '@/Pages/Customer/Sidebar.css';
import { FaUser, FaClipboardList, FaCommentDots, FaSignOutAlt } from 'react-icons/fa'; // Import new icons
import logo from '@/assests/logo.png';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link href="/dashboard" className="nav-link">
                        <FaClipboardList style={{ color: 'gold', fontSize: '20px', marginRight: '8px' }} />
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/user-management" className="nav-link">
                        <FaUser style={{ color: 'blue', fontSize: '20px', marginRight: '8px' }} />
                        User Management
                    </Link>
                </li>
                <li>
                    <Link href="/feedback" className="nav-link">
                        <FaCommentDots style={{ color: 'green', fontSize: '20px', marginRight: '8px' }} />
                        Feedback
                    </Link>
                </li>
                <li>
                    <Link href="/logout" className="nav-link">
                        <FaSignOutAlt style={{ color: 'red', fontSize: '20px', marginRight: '8px' }} />
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    );
}
