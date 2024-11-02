
import React, { useState, useEffect } from 'react';
import Rsidebar from './Rsidebar'; // Import Sidebar component
import '@/Pages/Customer/CustomerDashboard.css'; // Import Dashboard-specific CSS
import Rheader from './Rheader'; // Import the Header component
import { usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button'; // Adjust import based on your file structure
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"


export default function Dashboard() {
    const [selectedDate, setSelectedDate] = useState(''); // State to manage selected date
    const [appointments, setAppointments] = useState([]); // Example of state initialization
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    useEffect(() => {
      const fetchAppointments = async () => {
          try {
            const response = await fetch('http://127.0.0.1:8000/api/appointmenthandle');

              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setAppointments(data);
              setFilteredAppointments(data); // Set initial filtered appointments
          } catch (error) {
              console.error('Failed to fetch appointments:', error);
          }
      };
      fetchAppointments();
  }, []);
  
    

    const handleDateSelect = async (date) => {
      console.log(date);
      setSelectedDate(date);

      let filtered;

      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      const after = new Date();
      after.setDate(today.getDate() + 7); // Or however you define "after"

      switch (date) {
        case 'today':
            filtered = appointments.filter(appointment => 
                new Date(appointment.appointmentDate).toDateString() === today.toDateString()
            );
            break;
        case 'tomorrow':
            filtered = appointments.filter(appointment => 
                new Date(appointment.appointmentDate).toDateString() === tomorrow.toDateString()
            );
            break;
        case 'after':
            filtered = appointments.filter(appointment => 
                new Date(appointment.appointmentDate) > tomorrow
            );
            break;
        default:
            filtered = appointments; // Show all if no filter
     } 

      setFilteredAppointments(filtered);
      console.log(`Selected date: ${date}`);
      try {
          const response = await fetch(`/appointmenthandle?date=${date}`);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          setAppointments(data);
          setFilteredAppointments(data);
      } catch (error) {
          console.error('Failed to fetch appointments:', error);
      }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
        const response = await fetch(`/api/appointments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isFinished: status }), // Updated status
        });

        if (!response.ok) {
            throw new Error('Failed to update status');
        }

        // Update the filteredAppointments state to reflect the change
        setFilteredAppointments((prevAppointments) => 
            prevAppointments.map((appointment) => 
                appointment.id === id ? { ...appointment, isFinished: status } : appointment
            )
        );

        console.log('Status updated successfully');
    } catch (error) {
        console.error('Error updating status:', error);
    }
};

    return (
        <div className="dashboard-container flex justify-center"> 
            {/* Sidebar Component */}
            <Rsidebar />
            
            <div className="flex-1">
                {/* Header Component */}
                <Rheader />
                    
                <main className="overflow-x-hidden overflow-y-auto bg-gray-100 mt-4 ml-52" 
                  style={{ 
                      marginTop: '100px',
                       height: 'calc(100vh - 100px)'
                      
                   }}>
                    <div className="container mx-auto px-6 py-8">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Receptionist Dashboard</h1>

                        {/* Date selection buttons */}
                        <div className="flex space-x-4 mb-6">
                            <Button
                                onClick={() => handleDateSelect('today')}
                                variant={selectedDate === 'today' ? 'default' : 'outline'}
                            >
                                Today
                            </Button>
                            <Button
                                onClick={() => handleDateSelect('tomorrow')}
                                variant={selectedDate === 'tomorrow' ? 'default' : 'outline'}
                            >
                                Tomorrow
                            </Button>
                            <Button
                                onClick={() => handleDateSelect('after')}
                                variant={selectedDate === 'after' ? 'default' : 'outline'}
                            >
                                After
                            </Button>
                        </div>

                        {/* Additional content here */}
                        <p className="text-gray-700">You have selected: {selectedDate}</p>

                        {/* Appointments table */}
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Customer ID</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Service Type</TableHead>
                                <TableHead>AppointmentDate</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>isFinished</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredAppointments.map((appointment) => (
                                <TableRow key={appointment.id}>
                                  <TableCell>{appointment.customerID}</TableCell>
                                  <TableCell>{appointment.appointmentStatus}</TableCell>
                                  <TableCell>{appointment.serviceType}</TableCell>
                                  <TableCell>{appointment.appointmentDate}</TableCell>
                                  <TableCell>{appointment.appointmentTime}</TableCell>
                                  <TableCell>
                                     <select
                                       value={appointment.isFinished} // Bind to current status
                                       onChange={async (e) => {
                                           const newStatus = e.target.value;
                                           await handleUpdateStatus(appointment.id, newStatus); // Call update function
                                       }}
                                       className="p-2 border rounded-md w-36"
                                   >
                                       <option value="notFinished">Not Finished</option>
                                       <option value="finished">Finished</option>
                                    </select>
                                </TableCell>
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
