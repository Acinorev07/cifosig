
'use client';


import Link from 'next/link';
// import HamburgerIcon from '@/app/ui/HamburguerIcon';
import { Dispatch, SetStateAction } from 'react';

type SidePanelProps= {
  isActive: boolean;
  setIsActive:  Dispatch<SetStateAction<boolean>>;
}

export default function SidePanel(
    {isActive, setIsActive}:SidePanelProps
) {
 

  const sections = [
    { id: '/', title: 'Home' },
    { id: 'seccion', title: 'Quienes somos' },
    { id: '/mision-vision', title: 'Misión y Visión' },
    { id: 'seccion4', title: 'Blog' },
    { id: 'seccion5', title: 'Contáctanos' }
  ];

  return (
    <>
     
        <nav
            className={`
                fixed top-0 left-0 w-full h-full mt-30 bg-white transform transition-transform duration-300 ease-in-out z-30
                ${isActive ? 'translate-y-0' : '-translate-y-full'}
                lg:relative lg:w-64 lg:h-[calc(100vh-4rem)] lg:translate-y-0 lg:mt-0 lg:p-0
            `}
            >
            {sections.map((section) => (
                <Link
                key={section.id}
                href={`${section.id}`}
                onClick={() => setIsActive(false)}
                className="block p-4 m-2 text-center text-black rounded-md hover:bg-emerald-900 hover:text-emerald-200 transition"
                >
                {section.title}
                </Link>
            ))}
            </nav>

    </>
  );
}