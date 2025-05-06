/** @type {import('next').NextConfig} */
const nextConfig = {
      reactStrictMode: true,
      productionBrowserSourceMaps: true,
      modularizeImports: {
            '@mui/icons-material': {
                  transform: '@mui/icons-material/{{member}}',
            },
      },
      images: {
            remotePatterns: [
                  {
                        protocol: 'https',
                        hostname: 'lh3.googleusercontent.com'
                  },
                  {
                        protocol: 'https',
                        hostname: 'lh3.githubusercontent.com'
                  }
            ],
            unoptimized: true,
      },
};

export default nextConfig;
