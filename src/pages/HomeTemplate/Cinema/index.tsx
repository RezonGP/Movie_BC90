import Header from "../_component/layouts/Header";
import Footer from "../_component/layouts/Footer";

const Cinema = () => {
    return (
        <div>
            <Header />
            <main className="min-h-screen bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-cover bg-center text-white relative">
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative max-w-7xl mx-auto px-6 py-8">
                    <h1 className="text-3xl font-bold mb-8">Rạp Chiếu Phim</h1>
                    <p>Thông tin về các rạp chiếu phim sẽ được hiển thị ở đây.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Cinema;