/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true
    },
    typescript: {
        ignoreBuildErrors: true
    },
    experimental: {
      serverComponentsExternalPackages: ['@node-rs/argon2', '@node-rs/bcrypt']
    },
    webpack: (config) => {
      config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
      return config;
    }
}

module.exports = nextConfig
