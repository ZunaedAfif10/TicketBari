import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata = {
  title: "TicketBari",
  description: "Your Go-To Ticket Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={plusJakartaSans.className}>
      <body>
        <div className="min-h-screen bg-[#F4EFEA] text-[#2C2520] flex flex-col justify-between">
          <div>
            <Navbar />
            {/* We removed max-w-7xl and p-6 from here so that layouts 
              like the dashboard can stretch completely from left to right.
            */}
            <main className="w-full">
              {children}
            </main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}