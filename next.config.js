/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true
    },
    typescript: {
        ignoreBuildErrors: true
    },
    experimental: {
      serverComponentsExternalPackages: ['bcrypt']
    }
}

module.exports = nextConfig
