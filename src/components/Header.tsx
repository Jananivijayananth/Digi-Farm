import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Menu, X, ShoppingCart, User, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Header: React.FC = () => {
  const { user, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!user.isAuthenticated) {
    return null;
  }

  return (
    <header className="bg-green-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center space-x-2">
          <Leaf className="h-8 w-8" />
          <span className="text-xl font-bold">DigiFarm</span>
        </Link>
        
        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {user.role === 'user' && (
            <>
              <Link to="/dashboard" className="hover:text-green-200 transition-colors">
                Dashboard
              </Link>
              <Link to="/disease-detection" className="hover:text-green-200 transition-colors">
                Disease Detection
              </Link>
              <Link to="/marketplace" className="hover:text-green-200 transition-colors">
                Marketplace
              </Link>
            </>
          )}
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User size={18} />
              <span>{user.username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 hover:text-green-200 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-green-800 py-2">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            {user.role === 'user' && (
              <>
                <Link
                  to="/dashboard"
                  className="block py-2 hover:bg-green-700 px-3 rounded transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/disease-detection"
                  className="block py-2 hover:bg-green-700 px-3 rounded transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Disease Detection
                </Link>
                <Link
                  to="/marketplace"
                  className="block py-2 hover:bg-green-700 px-3 rounded transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Marketplace
                </Link>
              </>
            )}
            <div className="pt-2 border-t border-green-600">
              <div className="flex items-center space-x-2 py-2 px-3">
                <User size={18} />
                <span>{user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 w-full text-left py-2 px-3 hover:bg-green-700 rounded transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;