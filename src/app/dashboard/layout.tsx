import "@/app/globals.css";


import BottomNav from "@/";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full min-h-screen flex flex-col">
      
        
    

      <div id="cosell-reseller-app" className="w-full max-w-6xl flex flex-col p-4 overflow-y-auto mx-auto">
        {children}
      </div>

     
    </main>
  );
}