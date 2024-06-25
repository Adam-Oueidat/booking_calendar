/** @type {import('next').NextConfig} */
const nextConfig = { 
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.visitdenmark.se',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'files.guidedanmark.org',
        port: '',
        pathname: '**',
      }
    ],
  },};

export default nextConfig;
