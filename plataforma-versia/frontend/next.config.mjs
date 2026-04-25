/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Proxy para resolver multi-tenant (Host header é fixado pelo Next server-side)
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_PROXY_URL || 'http://demo.localhost:8000'}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
