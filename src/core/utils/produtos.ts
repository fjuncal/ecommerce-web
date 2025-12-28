import { Produto } from "@/core/domain/produto";
import { MOCK_PRODUTOS } from "@/core/config/mock-produtos";

function normalizarSlug(slug: string) {
  return decodeURIComponent(slug).trim().toLowerCase();
}

export function buscarProdutoPorSlug(slug: string): Produto | undefined {
  const alvo = normalizarSlug(slug);

  return MOCK_PRODUTOS.find((p) => normalizarSlug(p.slug) === alvo);
}
