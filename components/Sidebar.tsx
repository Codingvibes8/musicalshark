'use client';

import {HiHome} from 'react-icons/hi';
import {BiSearch} from 'react-icons/bi';
import {twMerge} from 'tailwind-merge';
import {usePathname} from 'next/navigation';

// import { Song } from '@/types';
// import usePlayer from '@/hooks/usePlayer';



import Library from './Library';
import React, {useMemo} from 'react';
import SidebarItem from "@/components/SidebarItem";
import Box from "@/components/Box";

interface SidebarProps {
    children: React.ReactNode;
}

const Sidebar = ({children}: SidebarProps) => {
    const pathname = usePathname();


    const routes = useMemo(
        () => [
            {
                icon: HiHome,
                label: 'Home',
                active: pathname !== '/search',
                href: '/',
            },
            {
                icon: BiSearch,
                label: 'Search',
                href: '/search',
                active: pathname === '/search',
            },
        ],
        [pathname]
    );

    return (
        <div
            className={twMerge(`flex h-full`,)}>
            <div className='md:flex hidden flex-col gap-y-2 bg-black  h-full
                w-[300px] p-2'>
                <div className={'flex items-center justify-center w-full gap-x-2 text-3xl text-yellow-300 font-bold'}>MusicShark</div>
                <Box className='flex flex-col gap-y-4 px-5 py-4'>
                    {routes.map((item) => (
                        <SidebarItem key={item.label} {...item} />
                    ))}
                </Box>

                <Box className='overflow-y-auto h-full'>
                    <Library/>
                </Box>
            </div>
            <main className='h-full flex-1 overflow-y-auto py-2'>{children}</main>
        </div>
    );
};

export default Sidebar;















