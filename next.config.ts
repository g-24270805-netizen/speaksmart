import type { NextConfig } from 'next';
const nextConfig: NextConfig = { serverExternalPackages: ['@prisma/client', 'pdf-parse', 'mammoth'] };
export default nextConfig;
