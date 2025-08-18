import Sidebar from "./components/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-700 ml-[260px] w-full h-screen ">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
