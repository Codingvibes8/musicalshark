
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'xcfcuwnidqddhtaaukrz.supabase.co',
            },
        ],
    },
};

export default nextConfig;
