import { Link } from "react-router"; // use `react-router-dom` instead of `react-router`

const Navbar = () => {
    return (
        <nav className="w-full flex items-center justify-between bg-white/30 backdrop-blur-lg border border-white/20 shadow-md rounded-xl px-6 py-3 mt-4 mb-6">
            {/* Left side: Logo and Brand */}
            <div className="flex items-center gap-3">
            <img
  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  alt="JobLens Logo"
  className="w-10 h-10 rounded-full shadow-md"
/>
                <Link to="/">
                    <span className="text-3xl font-bold tracking-tight text-blue-600 hover:text-blue-700 transition-colors">
                        JobLensAI
                    </span>
                </Link>
            </div>

            {/* Right side: CTA Button */}
            <Link
                to="/upload"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4"
                    />
                </svg>
                Upload Resume
            </Link>
        </nav>
    );
};

export default Navbar;
