"use client";

import Header from "@/components/Header";
import SidePanel from "@/components/SidePanel";
import { useState } from "react";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

const MapWidget = dynamic(() => import("@/app/Map/components/MapWidget"), {
  ssr: false,
});

export default function MapPage() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="grid grid-rows-[50px-1fr-20px]">
      <Header isActive={isActive} setIsActive={setIsActive} />
      <aside className={`${isActive ? 'lg:absolute lg:right-0 mr-4' : 'hidden'} top-0 w-full min-h-full bg-white z-999 bg-white lg:top-[8rem] lg:h-[calc(130vh-8rem)] lg:-mt-6 lg:w-70 rounded-md`}>
            <SidePanel 
                 isActive={isActive} setIsActive={setIsActive}
            />
        </aside>

      <main className=" mb-8">
        <div className="p-20">

           <MapWidget />

        </div>

      </main>

      <Footer />
    </div>
  );
}