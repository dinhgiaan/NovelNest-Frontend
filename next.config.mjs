// /** @type {import('next').NextConfig} */
// const nextConfig = {
//       async headers() {
//             return [
//                   {
//                         source: '/(.*)',
//                         headers: [
//                               {
//                                     key: 'Cross-Origin-Embedder-Policy',
//                                     value: 'unsafe-none',
//                               },
//                               {
//                                     key: 'Cross-Origin-Opener-Policy',
//                                     value: 'same-origin-allow-popups',
//                               },
//                               {
//                                     key: 'Cross-Origin-Resource-Policy',
//                                     value: 'cross-origin',
//                               },
//                         ],
//                   },
//             ]
//       },

//       // Allow loading resources from Cloudinary
//       images: {
//             remotePatterns: [
//                   {
//                         protocol: 'https',
//                         hostname: 'lh3.googleusercontent.com'
//                   },
//                   {
//                         protocol: 'https',
//                         hostname: 'lh3.githubusercontent.com'
//                   },
//                   {
//                         protocol: 'https',
//                         hostname: 'res.cloudinary.com'
//                   }
//             ],
//             unoptimized: true,
//       },

//       // Experimental features
//       experimental: {
//             serverComponentsExternalPackages: ['@mui/material'],
//             turbo: {
//                   rules: {
//                         '*.epub': {
//                               loaders: ['raw-loader'],
//                               as: '*.js',
//                         },
//                   },
//             },
//       },

//       reactStrictMode: true,
//       productionBrowserSourceMaps: true,

//       modularizeImports: {
//             '@mui/icons-material': {
//                   transform: '@mui/icons-material/{{member}}',
//             },
//       },

//       // Only use webpack config when not using Turbopack
//       webpack: (config, { dev, isServer }) => {
//             // Only apply webpack config in non-turbo mode
//             if (!process.env.TURBOPACK) {
//                   config.resolve.fallback = {
//                         ...config.resolve.fallback,
//                         fs: false,
//                         path: false,
//                         stream: false,
//                         zlib: false,
//                         util: false,
//                   }

//                   config.module.rules.push({
//                         test: /\.epub$/,
//                         use: 'raw-loader',
//                   })
//             }

//             return config
//       },
// }

// export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
      async headers() {
            return [
                  {
                        source: '/(.*)',
                        headers: [
                              { key: 'Access-Control-Allow-Origin', value: '*' },
                              { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
                              {
                                    key: 'Cross-Origin-Embedder-Policy',
                                    value: 'unsafe-none',
                              },
                              {
                                    key: 'Cross-Origin-Opener-Policy',
                                    value: 'same-origin-allow-popups',
                              },
                              {
                                    key: 'Cross-Origin-Resource-Policy',
                                    value: 'cross-origin',
                              },
                        ],
                  },
            ];
      },

      // Allow loading resources from Cloudinary
      images: {
            remotePatterns: [
                  {
                        protocol: 'https',
                        hostname: 'lh3.googleusercontent.com',
                  },
                  {
                        protocol: 'https',
                        hostname: 'res.cloudinary.com',
                  },
            ],
            unoptimized: true,
      },

      // Explicitly transpile @mui/material and related packages
      transpilePackages: ['@mui/material', '@emotion/styled', '@emotion/react'],

      // Experimental features
      experimental: {
            // Remove @mui/material from serverComponentsExternalPackages
            serverComponentsExternalPackages: [], // Add other packages if needed, but not @mui/material
            turbo: {
                  rules: {
                        '*.epub': {
                              loaders: ['raw-loader'],
                              as: '*.js',
                        },
                  },
            },
      },

      reactStrictMode: true,
      productionBrowserSourceMaps: true,

      modularizeImports: {
            '@mui/icons-material': {
                  transform: '@mui/icons-material/{{member}}',
            },
      },

      // Only use webpack config when not using Turbopack
      webpack: (config, { dev, isServer }) => {
            // Only apply webpack config in non-turbo mode
            if (!process.env.TURBOPACK) {
                  config.resolve.fallback = {
                        ...config.resolve.fallback,
                        fs: false,
                        path: false,
                        stream: false,
                        zlib: false,
                        util: false,
                  };

                  config.module.rules.push({
                        test: /\.epub$/,
                        use: 'raw-loader',
                  });
            }

            return config;
      },
};

export default nextConfig;