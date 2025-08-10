// Layout/MainLayout.tsx
import Navbar from "../Components/NavbarMenu/Navbar";
import { Outlet } from "react-router-dom";
import { SideBar } from "../Data";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4 fixed left-0 top-0 pt-20">
      <nav>
        <ul className="space-y-4">
          {SideBar.map((item,indx)=>(
            
            <li key={indx}><a href={item.Url} className="block hover:bg-gray-700 p-2 rounded">{item.title}</a></li>
          ))}

        

          
        </ul>
      </nav>
    </aside>
  );
};

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        {/* Sidebar ثابتة */}
        <Sidebar />

        {/* محتوى الصفحات */}
        <main className="flex-1 ml-64 pt-20 p-4">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default MainLayout;
