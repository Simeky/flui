import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/tarefas/:id",
        destination: "/tarefas/detalhes?id=:id",
      },
    ];
  },
};

export default nextConfig;
