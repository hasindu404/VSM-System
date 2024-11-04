import React from 'react';
import Sidebar from './Sidebar'; // Import Sidebar component
import './CustomerDashboard.css'; // Import Dashboard-specific CSS
import Header from './Header'; // Import the Header component
import { usePage } from '@inertiajs/react';



// export default function Dashboard() {
//     const user = usePage().props.auth.user;

    
           
 export default function CustomerDashboard() {

    const user = usePage().props.auth.user;

    
  return (
     <>   
    <Header />
    <Sidebar />
    <div className="content-area p-6 ml-[250px] mt-[100px] bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-64 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"}}>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h1 className="text-4xl font-bold mb-2">Welcome, {user.name}!</h1>
              <p className="text-xl">Your journey to exceptional service starts here.</p>
            </div>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-yellow-800">Notes</h2>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-semibold text-lg text-yellow-700 mb-2">Upcoming Service</h3>
                    <p className="text-gray-600">Remember to bring your vehicle for its scheduled maintenance on July 15th at 10:00 AM.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-semibold text-lg text-yellow-700 mb-2">Tire Rotation</h3>
                    <p className="text-gray-600">Your last tire rotation was 3 months ago. Consider scheduling one soon for optimal tire wear.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-semibold text-lg text-yellow-700 mb-2">Oil Change Reminder</h3>
                    <p className="text-gray-600">Your next oil change is due in approximately 500 miles. Plan accordingly!</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-blue-800">Service Tips</h2>
                <p className="text-blue-700 mb-4">Regular maintenance is key to keeping your vehicle in top condition. Here are some tips:</p>
                <ul className="list-disc list-inside text-blue-600 space-y-2">
                  <li>Check your oil regularly</li>
                  <li>Keep your tires properly inflated</li>
                  <li>Pay attention to warning lights</li>
                  <li>Schedule regular check-ups</li>
                  <li>Clean your vehicle regularly to prevent rust</li>
                  <li>Replace windshield wipers as needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

            
            {/* <div className="content-area flex items-center"> */}
                
                
                {/* <div className="ml-4">
                    <h1 className="text-4xl font-bold">Hi, {user.name}!</h1>
                    <p className="text-lg">Welcome to your gateway of streamlined vehicle management—where every journey counts!</p>
                </div> */}
    




