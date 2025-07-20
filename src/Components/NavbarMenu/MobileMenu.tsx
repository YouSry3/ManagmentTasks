import { Link } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";
import Button from "../UI/Button";

const NavbarMobile = ({ closeMenu }: { closeMenu: () => void }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <div className="md:hidden bg-white border-t border-gray-200 px-4 pt-4 pb-4">
      <Link to="/" className="block mb-2 text-gray-700 font-medium" onClick={closeMenu}>
        Home
      </Link>
      {user ? (
        <>
          <p className="text-gray-700 mb-2">Welcome <b>{user.user.username}</b></p>
          <Button onClick={handleLogout} className="w-full">Logout</Button>
        </>
      ) : (
        <>
          <Link to="/login" onClick={closeMenu}>
            <Button className="w-full mb-2">Login</Button>
          </Link>
          <Link to="/register" onClick={closeMenu}>
            <Button className="w-full">Register</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default NavbarMobile;
