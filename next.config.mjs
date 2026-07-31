/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Limits static-generation worker parallelism. Prevents OOM crashes
    // during `next build` on low-memory machines/CI runners; safe to
    // remove on hardware with more headroom (build will just run faster).
    cpus: 1,
  },
};

export default nextConfig;
