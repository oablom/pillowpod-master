/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com", "res.cloudinary.com"],
  },
  output: "standalone",
  reactStrictMode: true,
  generateStaticParams: false,
};

export default nextConfig;
