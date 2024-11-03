import React, { useState, useEffect } from 'react';
import Sidebar from '../Customer/Sidebar';  
import Header from '../Customer/Header';   
import '@/Pages/Customer/CustomerDashboard.css'; // Import Dashboard-specific CSS
import 'react-datepicker/dist/react-datepicker.css';


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import axios from 'axios';

// export default function Dashboard() {
//     return (
//         <div className="dashboard-container">
//             <Header />
//             <Sidebar />
//             <div className="content-area">
                
//             </div>
//         </div>
//     );
// }
  

 export default function Dashboard() {
    const [appointments, setAppointments] = useState([]); // State for appointments

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`/viewappointmentss`);
                console.log('databack');
                console.log(response.data);

                // if (!response.ok) {
                //     throw new Error('Network response was not ok');
                // }
                setAppointments(response.data.appointments);
                // const data = await response.json();
                // setAppointments(data.appointments); // Set appointments from the response
            } catch (error) {
                console.error('Failed to fetch appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    useEffect(() => {
        console.log('Updated appointments:', appointments);
    }, [appointments]);

   
    return (
        <div className="dashboard-container flex justify-center"> 
            <Sidebar />
            <div className="flex-1">
                <Header />
                <main className="overflow-x-hidden overflow-y-auto bg-gray-100 mt-4 ml-52" 
                    style={{ 
                        marginTop: '100px',
                        height: 'calc(100vh - 100px)',
                    }}>
                    <div className="container mx-auto px-6 py-8">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-6 justify:center">View Your Appointments</h1>

                        {/* Appointments table */}
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Customer ID</TableHead>
                                        <TableHead>Vehicle ID</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Service Type</TableHead>
                                        <TableHead>Appointment Date</TableHead>
                                        <TableHead>Time</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {appointments.map((appointment) => (
                                        <TableRow key={appointment.id}>
                                            <TableCell>{appointment.customerID}</TableCell>
                                            <TableCell>{appointment.vehicalid}</TableCell>
                                            <TableCell>{appointment.description}</TableCell>
                                            <TableCell>{appointment.serviceType}</TableCell>
                                            <TableCell>{appointment.appointmentDate}</TableCell>
                                            <TableCell>{appointment.appointmentTime}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );


    
}