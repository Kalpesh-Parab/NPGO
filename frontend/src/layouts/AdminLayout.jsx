import { Outlet } from "react-router-dom";
import Header from "../admin/components/header/Header";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      
      {/* Sticky Header */}
      <Header />

      {/* Page Content */}
      <main className="admin-content">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;
