import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 p-20">
      <div className="text-center text-artisan-gray-dark">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p>The requested page could not be found.</p>
      </div>
      <Link to="/">
        <div className="w-40 shadow-2xl  px-4 py-2 text-center rounded-full border border-gray-200 cursor-pointer bg-gray-300 text-white font-bold">
          Back to Home
        </div>
      </Link>
    </div>
  );
};

export default Error;
