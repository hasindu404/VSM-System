'use client'
import React from 'react';
import Rsidebar from '@/Pages/Receptionist/Rsidebar';
import Rheader from '@/Pages/Receptionist/Rheader';
import PrimaryButton from '@/Components/PrimaryButton';
import { CalendarDays, Clock, Car } from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
export default function AppointmentHandling() {
    const [selectedDate, setSelectedDate] = React.useState("today")
    const [appointmentsData, setAppointmentsData] = React.useState(appointments)
  
    const handleDateSelection = (date) => {
      setSelectedDate(date)
      // Here you would typically fetch appointments for the selected date
    }
  
    const toggleFinished = (id) => {
      setAppointmentsData(prevAppointments =>
        prevAppointments.map(appointment =>
          appointment.id === id
            ? { ...appointment, isFinished: !appointment.isFinished }
            : appointment
        )
      )
      // Here you would typically update the database with the new status
    }
  
    return (
      <div className="flex h-screen bg-gray-100">
        <Rsidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Rheader />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-6 py-8">
              <h1 className="text-3xl font-semibold text-gray-800 mb-6">Vehicle Service Appointments</h1>
              <Card>
                <CardHeader>
                  <CardTitle>Select Date</CardTitle>
                  <CardDescription>Choose a date to view appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <PrimaryButton
                      variant={selectedDate === "today" ? "default" : "outline"}
                      onClick={() => handleDateSelection("today")}
                    >
                      Today
                    </PrimaryButton>
                    <PrimaryButton
                      variant={selectedDate === "tomorrow" ? "default" : "outline"}
                      onClick={() => handleDateSelection("tomorrow")}
                    >
                      Tomorrow
                    </PrimaryButton>
                    <PrimaryButton
                      variant={selectedDate === "after" ? "default" : "outline"}
                      onClick={() => handleDateSelection("after")}
                    >
                      After
                    </PrimaryButton>
                  </div>
                </CardContent>
              </Card>
  
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Service Appointments</CardTitle>
                  <CardDescription>Manage vehicle service appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>A list of vehicle service appointments.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Service Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Employer Type</TableHead>
                        <TableHead>Finished</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appointmentsData.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell>{appointment.customerID}</TableCell>
                          <TableCell>{appointment.appointmentStatus}</TableCell>
                          <TableCell>{appointment.serviceType}</TableCell>
                          <TableCell>{appointment.appointmentDate}</TableCell>
                          <TableCell>{appointment.appointmentTime}</TableCell>
                          <TableCell>{appointment.employerType}</TableCell>
                          <TableCell>
                            <PrimaryButton
                              variant={appointment.isFinished ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleFinished(appointment.id)}
                            >
                              {appointment.isFinished ? "Finished" : "Not Finished"}
                            </PrimaryButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Car className="h-4 w-4" />
                    <span>{appointmentsData.length} Appointments</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    <span>For {selectedDate}</span>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </main>
        </div>
      </div>
    )
  }