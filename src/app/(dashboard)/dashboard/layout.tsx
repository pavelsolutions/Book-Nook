import React from "react";
import Sidebar from "./_components/Sidebar";

const Layout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex min-h-screen bg-[#F7FAFB] text-[#063047] transition-colors duration-300 dark:bg-[#071D2B] dark:text-[#E2EDF2]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="min-w-0 flex-1 bg-[#F7FAFB] pt-16 transition-colors duration-300 dark:bg-[#071D2B] md:pt-0">
        {children}
      </main>
    </div>
  );
};

export default Layout;