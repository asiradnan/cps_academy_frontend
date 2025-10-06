/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https', 
            hostname: 'strapicpsacademy-production.up.railway.app', 
            port: '', 
          },
        ],
    }
};

export default nextConfig;
