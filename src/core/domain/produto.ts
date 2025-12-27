export type VarianteProduto = {
  id: string;
  sku?: string; // identificador de estoque (Stock Keeping Unit)
  opcoes: Record<string, string>; // ex: { cor: "Preto", tamanho: "M" }
  precoCentavos: number;
  estoque: number;
};

export type Produto = {
  id: string;
  slug: string;

  titulo: string;
  descricao?: string;

  imagens: string[];
  categorias?: string[];

  nomesOpcoes: string[]; // ex: ["cor", "tamanho"] ou ["material"]
  variantes: VarianteProduto[];

  ativo: boolean;
};
