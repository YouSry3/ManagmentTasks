import { useState } from "react";
import NavbarDesktop from "./DesktopMenu";
import NavbarMobile from "./MobileMenu";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <NavbarDesktop />
          {/* Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-500 hover:text-black"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}>
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && <NavbarMobile closeMenu={() => setMobileMenuOpen(false)} />}
    </nav>
  );
};

export default Navbar;
