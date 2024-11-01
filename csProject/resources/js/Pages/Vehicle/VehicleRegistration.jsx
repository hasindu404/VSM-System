import GuestLayout from '@/Layouts/GuestLayout';
import { useForm } from '@inertiajs/inertia-react'
import React from 'react'
import Header from '../Customer/Header';
import Sidebar from '../Customer/Sidebar';
import { Head, Link } from '@inertiajs/react';
import { ToastContainer } from 'react-toastify';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function VehicleRegistration(){

    const {data, setData, post, processing } = useForm({
        vehicalid: '',
        brand:'',
        year:'',
        Catagory:'',
        last_service_date:'',
        colour:'',
        images:''
    })

    const submit = (e) =>{
        e.preventDefault();
            post(route('vehical.store'),{
                onSuccess:()=>{
                    onSuccess();
                    setData({vehicalid:'',brand:'',year:'',Catagory:'',last_service_date:'',colour:'',images:''});
                }
            })
    };
        return(
            <GuestLayout>
                <Header/>
                <Sidebar/>
                <Head title="Vehicle Registration"/>
                <ToastContainer position="top-right" autoClose={5000}/>
                <h2>Vehicle Registration</h2>
                <form onSubmit={submit} className="max-2-md mx-auto mt-8">
                    <div>
                        <InputLabel htmlFor="vehicalid" value="Vehicle Id"/>
                        <TextInput
                            id="vehicalid"
                            name="vehicleid"
                            value={data.vehicalid}
                            className="mt-1 block  w-full"
                            autoComplete="vehicalid"
                            onChange={(e)=> setData('vehicalid',e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="brand" value="Brand"/>
                        <TextInput
                            id="brand"
                            name="brand"
                            value={data.brand}
                            className="mt-1 bloack w-full"
                            autoComplete="brand"
                            onChange={(e)=> setData('brand',e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="year" value="Year"/>
                        <TextInput
                            id="year"
                            name="year"
                            value={data.year}
                            className="mt-1 block w-full"
                            autoComplete="year"
                            onChange={(e)=> setData('year',e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="Catagory" value="Catagory"/>
                        <TextInput
                            id="Catagory"
                            name="Catagory"
                            value={data.catagory}
                            className="mt-1 block w-full"
                            autoComplete="Catagory"
                            onChange={(e)=> setData('Catagory',e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="last_service_date" value="Last Service Date"/>
                        <TextInput
                            id="last_service_date"
                            type="date"
                            name="last_service_date"
                            value={data.last_service_date}
                            className="mt-1 block w-full"
                            autoComplete="last_service_date"
                            onChange={(e) => setData('last_service_date',e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="colour" value="Colour"/>
                        <TextInput
                            id="colour"
                            name="colour"
                            value={data.colour}
                            className="mt-1 block w-full"
                            autoComplete="colour"
                            onChange={(e) => setData('colour',e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="images" Value="Images"/>
                        <TextInput
                            id="images"
                            type="file"
                            value={data.images}
                            accept="images/*"
                            onChange={(e)=>setData('images',e.target.value)}
                        />
                    </div>
                    <div className="mt-4 flex items-center justify-end">
                        <Link
                            href={route('CustomerDashboard')}
                            class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Go to Dashboard
                        </Link>
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Submit
                        </PrimaryButton>
                    </div>

                </form>
            </GuestLayout>
        );
}
