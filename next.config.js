const { parsed: myEnv } = require('dotenv').config({
  path:'./.env.local'
})


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: process.env.API_URL
  },
  images: {
    domains: ['<bucket>.s3.amazonaws.com'],
  },
}

module.exports = nextConfig