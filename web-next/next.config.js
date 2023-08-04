const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

/** @type {import('next').NextConfig} */
const nextConfig = {
    generateEtags: false,
    rewrites: async () => {
        return [
            {
                source: '/api/:path*',
                destination: `${API}/:path*`
            }
        ]
    }
}

module.exports = nextConfig;
