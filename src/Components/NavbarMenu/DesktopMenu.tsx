import { Link } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";
import Button from "../UI/Button";

const NavbarDesktop = () => {
  const { user, logout } = useAuth();

  return (
    <div className="hidden md:flex justify-between w-full">
      <div className="flex items-center space-x-8">
        <Link to="/" className="flex items-center">
          <img src="https://tailwindflex.com/images/logo.svg" className="h-8 w-auto" alt="Logo" />
          <span className="ml-2 font-bold text-gray-800 text-xl">Todo List</span>
        </Link>
        <Link to="/" className="text-gray-800 font-medium hover:text-indigo-600">
          Home
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-gray-700">Welcome <b>{user.user.username}</b></span>
            <Button variant={"danger"} onClick={logout}>Logout</Button>
          </>
        ) : (
          <>
            <Link to="/login"><Button>Login</Button></Link>
            <Link to="/register"><Button>Register</Button></Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavbarDesktop;
