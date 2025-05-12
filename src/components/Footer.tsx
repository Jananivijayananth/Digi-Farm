import React from 'react';
import { Leaf, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-6 w-6" />
              <span className="text-xl font-bold">DigiFarm</span>
            </div>
            <p className="text-green-100 mb-4">
              Empowering farmers with digital solutions for crop health and direct market access.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-green-100 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-green-100 hover:text-white transition-colors">Services</a></li>
              <li><a href="#" className="text-green-100 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-green-100 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <MapPin size={18} />
                <span>123 Farm Road, Agritown</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} />
                <span>info@digifarm.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-green-700 mt-8 pt-6 text-center">
          <p className="text-green-100">© {new Date().getFullYear()} DigiFarm. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;