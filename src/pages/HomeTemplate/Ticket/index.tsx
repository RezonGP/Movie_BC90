import Header from "../_component/layouts/Header";
import Footer from "../_component/layouts/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Ticket = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('USER_ADMIN');
        if (!user) {
            navigate('/auth', { replace: true });
        }
    }, [navigate]);


    return (
        <div>
            <Header />
            <main className="min-h-screen bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-cover bg-center text-white relative">
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative max-w-7xl mx-auto px-6 py-8">
                    <h1 className="text-3xl font-bold mb-8">Đặt Vé</h1>
                    <p>Chức năng đặt vé sẽ được triển khai ở đây.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Ticket;