import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        // Aplica a todas as rotas da aplicação
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            // Use 'none' para bloquear tudo, ou 'self' para permitir apenas no seu domínio
            value: "frame-ancestors 'none';"
          },
          {
            key: 'X-Frame-Options',
            // Use DENY para bloquear tudo, ou SAMEORIGIN para permitir apenas no seu domínio
            value: 'DENY'
          }
        ]
      }
    ];
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'thumbs.dreamstime.com' }]
  }
};

export default nextConfig;
