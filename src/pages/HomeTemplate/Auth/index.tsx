
import Header from '../_component/layouts/Header';
import Footer from '../_component/layouts/Footer';

export default function Auth() {


    return (
        <div>
            <Header />
            <main className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
                <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-center">Đăng Nhập</h1>
                    <form >
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"

                                className="w-full px-3 py-2 bg-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">Mật Khẩu</label>
                            <input
                                type="password"

                                className="w-full px-3 py-2 bg-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 py-2 rounded font-semibold"
                        >
                            Đăng Nhập
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}
