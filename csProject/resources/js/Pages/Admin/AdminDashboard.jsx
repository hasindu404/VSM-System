
import Asidebar from './Asidebar';
import Aheader from './Aheader';
import '@/Pages/Customer/CustomerDashboard.css';
import { Users, Calendar, MessageSquare, Car } from "lucide-react"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ appointments: 0, users: 0, Feedbacks: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
          try {
            const response = await axios.get('/dashboard/stats'); // Adjust this URL as necessary
            setStats(response.data);
            // console.log(response.data);

            // console.log(response.data.feedbacks);
            console.log(`Number of feedbacks: ${response.data.feedbacks}`);
            // if (Array.isArray(response.data.feedbacks)) {
            //     console.log(`Number of feedbacks: ${response.data.feedbacks.length}`);
            // } else {
            //     console.log('Feedbacks is not an array');
            // }
          } catch (err) {
            setError('Failed to fetch stats');
          } finally {
            setLoading(false);
          }
        };
    
        fetchStats();
      }, []);


      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>{error}</div>;
      }
    

    return (
    <div className="dashboard-container">
            {/* Header Component */}
            <Aheader />
            <Asidebar />
    <div className="content-area p-6 ml-[250px] mt-[100px]">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* Appointments Card */}
        <div className="rounded-xl border bg-black text-white p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Appointments</h3>
            <Calendar className="h-6 w-6 text-gray-300" />
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold">{stats.appointments}</div>
            <p className="text-sm text-gray-300">
              Scheduled appointments
            </p>
          </div>
        </div>

        {/* Users Card */}
        <div className="rounded-xl border bg-black text-white p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Total Users</h3>
            <Users className="h-6 w-6 text-gray-300" />
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold">{stats.users}</div>
            <p className="text-sm text-gray-300">
              Active users in your system
            </p>
          </div>
        </div>

        
        <div className="rounded-xl border bg-black text-white p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Feedbacks</h3>
            <MessageSquare  className="h-6 w-6 text-gray-300" />
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold">{stats.feedbacks}</div>
            <p className="text-sm text-gray-300">
              Customer Feedbacks
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}