import withFonts from 'next-fonts';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

export default withFonts(nextConfig);