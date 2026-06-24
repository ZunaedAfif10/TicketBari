import Sidebar from "@/components/Dashboard/Sidebar";


export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] w-full bg-[#F4EFEA]">
      {/* Sidebar - Stays fixed on the left on desktop */}
      <Sidebar />
      
      {/* Main Workspace - Grows to fill the rest of the window */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}