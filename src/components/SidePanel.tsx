
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
                absolute top-0 w-full mt-30 bg-white rounded-lg transform transition-transform duration-300 ease-in-out lg:mt-8
                ${isActive ? 'translate-y-0' : '-translate-y-full'}
                
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