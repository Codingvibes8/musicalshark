import {Figtree} from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import ToasterProvider from '@/providers/ToasterProvider';
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import SupabaseProvider from '@/providers/SupabaseProvider';
//import Player from '@/components/Player';
//import getSongsByUserId from '@/actions/getSongsByUserId';
//import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices';



const font = Figtree({subsets: ['latin']});

export const metadata = {
    title: 'musicalshark',
    description:
        '🎵🎧Spotify clone created by codigvibes8 using Next.js 13, Tailwind CSS and TypeScript. 🔊🎶',
};

export const revalidate = 0;

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    // const products = await getActiveProductsWithPrices();
    // const userSongs = await getSongsByUserId();

    return (
        <html lang='en'>
        <body className={font.className}>
        <ToasterProvider/>
        <SupabaseProvider>
            <UserProvider>
                <ModalProvider/>
                <Sidebar>{children}</Sidebar>
                {/*// <Player/>*/}
            </UserProvider>
        </SupabaseProvider>
        </body>
        </html>
    );
}
