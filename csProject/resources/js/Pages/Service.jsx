import Header from "@/Components/Header"
import ServiceContent from "@/Components/ServiceContent"
import Footer from "@/Components/Footer"
import { Head } from "@inertiajs/react"

const Home = () => {
  return (
    <div>
        <Head/>
        <Header/>
        <ServiceContent/>
        <Footer/>
        
    </div>
  )
}

export default Home