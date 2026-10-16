import "server-only";
import sharp from "sharp";

export const BUCKET_FOTOS = "fotos-perfil";
const TAMANHO_MAXIMO = 2 * 1024 * 1024;

/** Há uma foto de verdade neste campo do formulário? */
export function temFoto(arquivo) {
  return arquivo && typeof arquivo === "object" && "arrayBuffer" in arquivo && arquivo.size > 0;
}

/** Erro de validação da foto (em linguagem simples) ou null. */
export function validarFoto(arquivo) {
  if (!temFoto(arquivo)) return null;
  if (!String(arquivo.type).startsWith("image/")) return "Escolha uma foto (imagem).";
  if (arquivo.size > TAMANHO_MAXIMO) return "A foto é grande demais. Tente outra.";
  return null;
}

/**
 * Salva a foto de perfil: recorta quadrada, reduz para 512 px e regrava como WebP.
 * Regravar também apaga os metadados da foto (EXIF), como a localização GPS.
 * Usa o cliente Supabase da própria usuária: as regras do Storage só deixam
 * gravar na pasta dela. Devolve true se deu certo.
 */
export async function salvarFoto(supabase, userId, arquivo) {
  let imagem;
  try {
    imagem = await sharp(Buffer.from(await arquivo.arrayBuffer()))
      .rotate() // respeita a orientação do celular antes de apagar o EXIF
      .resize(512, 512, { fit: "cover" })
      .webp({ quality: 80 })
      .toBuffer();
  } catch {
    return false; // arquivo que não é imagem de verdade
  }

  const caminho = `${userId}/foto.webp`;
  const { error } = await supabase.storage
    .from(BUCKET_FOTOS)
    .upload(caminho, imagem, { contentType: "image/webp", upsert: true });
  if (error) return false;

  const { error: erroPerfil } = await supabase.from("perfis").update({ foto_path: caminho }).eq("id", userId);
  return !erroPerfil;
}

/** Link temporário (1 hora) para mostrar a foto privada. */
export async function linkDaFoto(supabase, caminho) {
  if (!caminho) return null;
  const { data } = await supabase.storage.from(BUCKET_FOTOS).createSignedUrl(caminho, 60 * 60);
  return data?.signedUrl ?? null;
}
