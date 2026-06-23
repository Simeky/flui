import type { NextConfig } from 'next';

import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: "public", 
  disable: process.env.NODE_ENV === "development", 
  register: true,  
});

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async rewrites() {
    return [
      {
        source: "/tarefas/:id",
        destination: "/tarefas/detalhes?id=:id",
      },
    ];
  },
};

export default withPWA(nextConfig);