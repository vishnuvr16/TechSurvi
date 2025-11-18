import { useLocation, Link } from "react-router-dom"; 
import { useEffect } from "react";
import { Frown, ArrowLeft } from 'lucide-react'; 

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    
    <div className="flex min-h-screen items-center justify-center bg-slate-900 text-gray-100 p-6">
      <div className="text-center p-10 md:p-16 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 max-w-lg">
        
        <Frown className="w-16 h-16 text-sky-500 mx-auto mb-6" />
        <h1 className="mb-4 text-7xl font-extrabold text-white">404</h1>
        
        <p className="mb-4 text-2xl font-semibold text-sky-400">
          Page Not Found
        </p>
        
        <p className="mb-8 text-lg text-gray-400">
          We can't find the page you're looking for at: 
          <code className="bg-slate-700/50 text-sky-300 p-1 rounded block mt-2 break-all font-mono text-sm">
            {location.pathname}
          </code>
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white font-medium rounded-lg 
                     hover:bg-sky-500 transition shadow-lg shadow-sky-600/40"
        >
          <ArrowLeft className="w-5 h-5" />
          Return to Home
        </Link>
        
      </div>
    </div>
  );
};

export default NotFound;