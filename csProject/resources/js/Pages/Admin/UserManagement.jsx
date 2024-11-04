import React from 'react';
import '@/Pages/Customer/CustomerDashboard.css'; // Import Dashboard-specific CSS
import Aheader from './Aheader';
import Sidebar from './Asidebar';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head,Link,useForm } from '@inertiajs/react';
import { ToastContainer } from 'react-toastify';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Option } from 'lucide-react';
import PrimaryButton from '@/Components/PrimaryButton';


export default function Dashboard() {
    const {data, setData, post, processing} = useForm({
        name:'',
        email:'',
        userType:'',
        password:'',
    });

    const submit =(e)=>{
        e.preventDefault();
            post(route('Feedback.store'),{
                onSuccess:()=>{
                    onSuccess();
                    setData({name:'',email:'',userType:'',password:''})
                }
            });
    };

    return (
            <GuestLayout>
            <Aheader />
            <Sidebar/>
                <Head title='User Registration'/>
                <ToastContainer position='top-right' autoClose={5000}/>
                <form onSubmit={submit} className='max-2-md mx-auto mt-8:'>
                    <div>
                        <InputLabel htmlFor="name" value="Name"/>
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            onChange={(e)=> setData('name',e.target.value)}
                            required
                        />
                    </div>
                    <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    </div>
                    <div>
                        <InputLabel htmlFor="userType" value="User Type"/>
                        <select
                            id="userType"
                            name='userType'
                            value={data.userType}
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            onChange={(e) => setData('userType',e.target.value)}
                            required
                        >
                            <option value="">Select a User Type</option>
                            <option value="Recpition">Reciption
                            </option>
                        </select>
                    </div>
                    <div>
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                </div>
                <div className="mt-4 flex items-center justify-end">
                    <Link
                    href={route('AdminDashboard')}
                    className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Go to Dashboard
                    </Link>
                    <PrimaryButton className='ms-4' disabled={processing}>
                        Add User
                    </PrimaryButton>
                </div>
                </form>
        </GuestLayout>
    );
}
