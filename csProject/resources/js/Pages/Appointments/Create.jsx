import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Sidebar from '../Customer/Sidebar';  // Relative path to Sidebar.jsx
import Header from '../Customer/Header';    // Relative path to Header.jsx



export default function CreateAppointment() {
    const { data, setData, post, processing, errors, reset } = useForm({
        customerID: '',
        appointmentStatus: '',
        serviceType: '',
        appointmentDate: '',
        employerType: '',
        timeSlot: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('appointments'), {
            onFinish: () => reset('appointmentStatus', 'serviceType', 'appointmentDate', 'employerType', 'timeSlot'),
        });
    };

    return (
        <GuestLayout>
        <Header/>
        <Sidebar/>
            <Head title="Create Appointment" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="customerID" value="Customer ID" />

                    <TextInput
                        id="customerID"
                        name="customerID"
                        value={data.customerID}
                        className="mt-1 block w-full"
                        autoComplete="customerID"
                        onChange={(e) => setData('customerID', e.target.value)}
                        required
                    />

                    <InputError message={errors.customerID} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="appointmentStatus" value="Appointment Status" />

                    <TextInput
                        id="appointmentStatus"
                        name="appointmentStatus"
                        value={data.appointmentStatus}
                        className="mt-1 block w-full"
                        autoComplete="appointmentStatus"
                        onChange={(e) => setData('appointmentStatus', e.target.value)}
                        required
                    />

                    <InputError message={errors.appointmentStatus} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="serviceType" value="Service Type" />

                    <TextInput
                        id="serviceType"
                        name="serviceType"
                        value={data.serviceType}
                        className="mt-1 block w-full"
                        autoComplete="serviceType"
                        onChange={(e) => setData('serviceType', e.target.value)}
                        required
                    />

                    <InputError message={errors.serviceType} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="appointmentDate" value="Appointment Date" />

                    <TextInput
                        id="appointmentDate"
                        type="date"
                        name="appointmentDate"
                        value={data.appointmentDate}
                        className="mt-1 block w-full"
                        autoComplete="appointmentDate"
                        onChange={(e) => setData('appointmentDate', e.target.value)}
                        required
                    />

                    <InputError message={errors.appointmentDate} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="employerType" value="Employer Type" />

                    <TextInput
                        id="employerType"
                        name="employerType"
                        value={data.employerType}
                        className="mt-1 block w-full"
                        autoComplete="employerType"
                        onChange={(e) => setData('employerType', e.target.value)}
                        required
                    />

                    <InputError message={errors.employerType} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="timeSlot" value="Time Slot" />

                    <TextInput
                        id="timeSlot"
                        name="timeSlot"
                        type= "time"
                        value={data.timeSlot}
                        className="mt-1 block w-full"
                        autoComplete="timeSlot"
                        onChange={(e) => setData('timeSlot', e.target.value)}
                        required
                    />

                    <InputError message={errors.timeSlot} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('CustomerDashboard')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Go to Dashboard
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Create Appointment
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
