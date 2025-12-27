import { Produto } from "@/core/domain/produto";

export const MOCK_PRODUTOS: Produto[] = [
  {
    id: "p1",
    slug: "produto-essencial-1",
    titulo: "Produto Essencial 1",
    descricao: "Produto genérico com variações. Serve para qualquer tema.",
    imagens: [
      "https://picsum.photos/seed/p1/900/900",
      "https://picsum.photos/seed/p1b/900/900",
    ],
    categorias: ["novidades"],
    nomesOpcoes: ["cor", "tamanho"],
    variantes: [
      {
        id: "v1",
        sku: "P1-PRETO-P",
        opcoes: { cor: "Preto", tamanho: "P" },
        precoCentavos: 12990,
        estoque: 8,
      },
      {
        id: "v2",
        sku: "P1-PRETO-M",
        opcoes: { cor: "Preto", tamanho: "M" },
        precoCentavos: 12990,
        estoque: 3,
      },
      {
        id: "v3",
        sku: "P1-BRANCO-P",
        opcoes: { cor: "Branco", tamanho: "P" },
        precoCentavos: 12990,
        estoque: 0,
      },
    ],
    ativo: true,
  },
  {
    id: "p2",
    slug: "produto-essencial-2",
    titulo: "Produto Essencial 2",
    descricao: "Visual limpo e moderno. Perfeito para moda, joias, fitness, etc.",
    imagens: ["https://picsum.photos/seed/p2/900/900"],
    categorias: ["destaques"],
    nomesOpcoes: ["material"],
    variantes: [
      {
        id: "v1",
        sku: "P2-ACO",
        opcoes: { material: "Aço" },
        precoCentavos: 18990,
        estoque: 12,
      },
      {
        id: "v2",
        sku: "P2-OURO",
        opcoes: { material: "Ouro" },
        precoCentavos: 24990,
        estoque: 5,
      },
    ],
    ativo: true,
  },
  {
    id: "p3",
    slug: "produto-essencial-3",
    titulo: "Produto Essencial 3",
    descricao: "Produto simples (sem variações). Ótimo para validar o catálogo.",
    imagens: ["https://picsum.photos/seed/p3/900/900"],
    categorias: ["promo"],
    nomesOpcoes: [],
    variantes: [
      {
        id: "v1",
        sku: "P3-STD",
        opcoes: {},
        precoCentavos: 9990,
        estoque: 2,
      },
    ],
    ativo: true,
  },
];
