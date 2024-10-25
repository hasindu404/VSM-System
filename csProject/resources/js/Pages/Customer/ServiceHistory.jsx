import GuestLayout from "@/Layouts/GuestLayout";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Head } from "@inertiajs/react";
import { ToastContainer } from "react-toastify";

export default function servicehistory(){

    return(
        <GuestLayout>
            <Header/>
            <Sidebar/>
            <Head title="Service History"/>
            <ToastContainer position="top-right" autoClose={5000}/>


        </GuestLayout>
    );
}
