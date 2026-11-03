import React from "react";
import Sidebar from "./_components/Sidebar";

const Layout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="min-w-0 flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;