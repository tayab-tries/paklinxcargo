import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  transpilePackages: [
    'next-sanity',
    'sanity',
    '@sanity/sdk-react',
    '@sanity/workbench',
  ],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.raahiinternational.com',
          },
        ],
        destination: 'https://raahiinternational.com/:path*',
        permanent: true,
      },
      {
        source: '/services/air-freight',
        destination: '/cargo-services',
        permanent: true,
      },
      {
        source: '/services/sea-cargo',
        destination: '/cargo-services',
        permanent: true,
      },
      {
        source: '/services/cargo-services',
        destination: '/cargo-services',
        permanent: true,
      },
      {
        source: '/services/air-and-sea-cargo',
        destination: '/cargo-services',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
