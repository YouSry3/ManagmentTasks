// Layout/MainLayout.tsx
import Navbar from "../Components/NavbarMenu/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
