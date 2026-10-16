/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  experimental: {
    serverActions: {
      // A foto do cadastro já é reduzida no celular (~100 KB); 2 MB dá folga.
      bodySizeLimit: "2mb",
    },
  },
  async redirects() {
    return [
      // Violência obstétrica ganhou conteúdo e foi para a área Parto.
      {
        source: "/temas/violencia-obstetrica",
        destination: "/parto/violencia-obstetrica",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
