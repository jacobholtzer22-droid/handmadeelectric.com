/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,

  // Redirect map for the retired Squarespace URLs (Appendix B).
  // Permanent = 308. Filled in fully during Phase 2.
  async redirects() {
    return [
      { source: "/cart", destination: "/", permanent: true },
      { source: "/services-store-SAziy", destination: "/services", permanent: true },
      // The old Residential card pointed at the industrial product URL, so this
      // mapping is ambiguous by the client's own linking. Send it to the index.
      { source: "/services-store-SAziy/p/industrial", destination: "/services", permanent: true },
      { source: "/services-store-SAziy/p/commercial", destination: "/services/commercial", permanent: true },
      { source: "/services-store-SAziy/p/industrial-1", destination: "/services/industrial", permanent: true },
    ];
  },
};

export default nextConfig;
