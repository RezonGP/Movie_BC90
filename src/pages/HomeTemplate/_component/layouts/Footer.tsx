import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] text-white">
            <div className="mx-auto w-full max-w-7xl px-4 py-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div>
                        <h2 className="mb-6 text-lg font-semibold uppercase">About</h2>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/" className="hover:text-gray-300 transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link to="/movies" className="hover:text-gray-300 transition-colors">Movies</Link>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors">About Us</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-lg font-semibold uppercase">Cinemas</h2>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/cinema" className="hover:text-gray-300 transition-colors">Find Cinemas</Link>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors">Locations</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors">Showtimes</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-lg font-semibold uppercase">Support</h2>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors">FAQ</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors">Help Center</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors">Customer Service</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-lg font-semibold uppercase">Legal</h2>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr className="my-8 border-gray-700" />
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <span className="text-sm text-gray-400 mb-4 md:mb-0">
                        © 2025 MovieStreet.
                    </span>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.017 0C8.396 0 7.996.014 6.79.067 5.584.12 4.775.302 4.084.605c-.713.306-1.318.707-1.927 1.316C1.548 2.53 1.147 3.135.841 3.848.538 4.539.356 5.348.303 6.554.25 7.76.234 8.16.234 11.783c0 3.623.016 4.023.07 5.229.053 1.206.235 2.015.538 2.706.303.691.704 1.296 1.313 1.905.609.609 1.214 1.01 1.927 1.316.691.303 1.5.485 2.706.538 1.206.053 1.606.067 5.229.067 3.623 0 4.023-.014 5.229-.067 1.206-.053 2.015-.235 2.706-.538.691-.303 1.296-.704 1.905-1.313.609-.609 1.01-1.214 1.316-1.927.303-.691.485-1.5.538-2.706.053-1.206.067-1.606.067-5.229 0-3.623-.014-4.023-.067-5.229-.053-1.206-.235-2.015-.538-2.706-.303-.691-.704-1.296-1.313-1.905-.609-.609-1.214-1.01-1.927-1.316C19.461.302 18.652.12 17.446.067 16.24.014 15.84 0 12.017 0zm4.964 2.375c.675 0 1.22.545 1.22 1.22s-.545 1.22-1.22 1.22-1.22-.545-1.22-1.22.545-1.22 1.22-1.22zM12.017 5.84a6.163 6.163 0 100 12.326 6.163 6.163 0 000-12.326zm0 2.375a3.788 3.788 0 110 7.576 3.788 3.788 0 010-7.576z" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
