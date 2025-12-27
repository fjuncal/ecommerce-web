import Link from "next/link";
import { Produto } from "@/core/domain/produto";
import { formatarBRLDeCentavos } from "@/core/utils/dinheiroFormatter";

type ProdutoCardProps = {
	produto: Produto;
};

function obterMenorPrecoCentavos(produto: Produto): number {
	return Math.min(...produto.variantes.map((v) => v.precoCentavos));
}

export default function ProdutoCard({ produto }: ProdutoCardProps) {
	const preco = formatarBRLDeCentavos(obterMenorPrecoCentavos(produto));
	const imagem = produto.imagens[0];

	return (
		<Link
			href={`/produtos/${produto.slug}`}
			className="group block overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-background) hover:bg-(--color-surface)"
		>
			<div className="aspect-square w-full overflow-hidden bg-(--color-surface)">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={imagem}
					alt={produto.titulo}
					className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
				/>
			</div>

			<div className="p-4">
				<div className="flex items-start justify-between gap-3">
					<h3 className="text-sm font-medium text-(--color-text-primary)">
						{produto.titulo}
					</h3>
					<span className="text-sm font-semibold text-(--color-text-primary)">
						{preco}
					</span>
				</div>

				{produto.descricao ? (
					<p className="mt-2 line-clamp-2 text-sm text-(--color-text-secondary)">
						{produto.descricao}
					</p>
				) : null}
			</div>
		</Link>
	);
}
