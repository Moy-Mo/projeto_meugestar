/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
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
