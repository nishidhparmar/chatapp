import { ReactNode } from "react";
import Header from "./header";
import Sidebar from "./sidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-neutral-secondary">
          {children}
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
