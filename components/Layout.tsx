import React from 'react';
import { LogOut, Search, Menu, Bell } from 'lucide-react';
import { USER_NAME } from '../constants';
import { Page } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate }) => {
  const navItems: { id: Page; label: string }[] = [
    { id: 'Accounts', label: 'Accounts' },
    { id: 'Planning', label: 'Planning' },
    { id: 'News', label: 'News & Research' },
    { id: 'Profile', label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Top Fidelity Green Bar */}
      <div className="bg-[#5d9632] h-1.5 w-full"></div>

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo Area */}
            <div className="flex items-center">
              <div 
                className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
                onClick={() => onNavigate('Accounts')}
              >
                {/* Simulated Logo */}
                <div className="w-8 h-8 bg-[#5d9632] rounded-sm flex items-center justify-center text-white font-bold text-lg">
                  F
                </div>
                <div className="h-6 w-[1px] bg-gray-300 mx-2"></div>
                <span className="text-xl font-semibold text-gray-800 tracking-tight">NetBenefits</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`
                    font-medium px-1 pt-1 h-16 flex items-center transition-colors border-b-2 focus:outline-none
                    ${activePage === item.id 
                      ? 'border-[#5d9632] text-gray-900' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-gray-500 p-1">
                <Search className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-gray-500 p-1 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>
              <div className="h-6 w-[1px] bg-gray-300 mx-2 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 hidden sm:block">Hello, {USER_NAME.split(' ')[0]}</span>
                <button className="text-gray-500 hover:text-[#5d9632]">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Bar (Simulated) */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
         <span className="text-sm font-semibold text-gray-600">{activePage}</span>
         <Menu className="w-5 h-5 text-gray-600" />
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-500">
            <div>
              <p className="font-semibold text-gray-700 mb-2">Contact Us</p>
              <p>1-800-FIDELITY</p>
              <p>Representative hours: Mon-Fri 8:30AM - 8:00PM ET</p>
            </div>
            <div>
               <p className="font-semibold text-gray-700 mb-2">Important Information</p>
               <p className="mb-1">Investing involves risk, including risk of loss.</p>
               <p>This information is intended to be educational.</p>
            </div>
            <div className="text-right md:text-right">
              <p>© 2024 FMR LLC.</p>
              <p>All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;