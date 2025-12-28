import Container from "@/ui/layout/Container";
import { buscarProdutoPorSlug } from "@/core/utils/produtos";
import PainelCompraProduto from "@/modules/catalogo/PainelCompraProduto";
import Link from "next/link";

type PageProps = {
	params: Promise<{
		slug: string;
	}>;
};

export default async function ProdutoDetalhePage({ params }: PageProps) {
	const { slug } = await params;

	const produto = buscarProdutoPorSlug(slug);

	if (!produto) {
		return (
			<Container>
				<div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-6">
					<h1 className="text-2xl font-semibold text-(--color-text-primary)">
						Produto não encontrado
					</h1>
					<p className="mt-2 text-(--color-text-secondary)">
						Verifique o link ou volte para o catálogo.
					</p>

					<Link
						href="/produtos"
						className="mt-6 inline-flex rounded-xl bg-(--color-accent) px-4 py-2 text-sm font-medium text-white hover:opacity-95"
					>
						Voltar para produtos
					</Link>
				</div>
			</Container>
		);
	}

	const imagemPrincipal = produto.imagens[0];
	const miniaturas = produto.imagens.slice(0, 4);

	return (
		<Container>
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
				{/* Imagens */}
				<div className="flex flex-col gap-3">
					<div className="overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-surface)">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={imagemPrincipal}
							alt={produto.titulo}
							className="aspect-square w-full object-cover"
						/>
					</div>

					{miniaturas.length > 1 ? (
						<div className="grid grid-cols-4 gap-3">
							{miniaturas.map((img) => (
								<div
									key={img}
									className="overflow-hidden rounded-xl border border-(--color-border) bg-(--color-surface)"
								>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={img}
										alt=""
										className="aspect-square w-full object-cover"
									/>
								</div>
							))}
						</div>
					) : null}
				</div>

				{/* Conteúdo */}
				<div className="flex flex-col gap-4">
					<div>
						<h1 className="text-3xl font-semibold tracking-tight text-(--color-text-primary)">
							{produto.titulo}
						</h1>
						<p className="mt-2 text-(--color-text-secondary)">
							{produto.descricao}
						</p>
					</div>

					<PainelCompraProduto produto={produto} />

					<div className="rounded-2xl border border-(--color-border) bg-(--color-background) p-4">
						<h2 className="text-sm font-semibold text-(--color-text-primary)">
							Informações
						</h2>
						<ul className="mt-2 space-y-1 text-sm text-(--color-text-secondary)">
							<li>• Produto genérico e adaptável</li>
							<li>• Variações por variante (cor/tamanho/material)</li>
							<li>• Backend Java será integrado depois</li>
						</ul>

						<Link
							href="/produtos"
							className="mt-4 inline-flex rounded-xl border border-(--color-border) bg-(--color-background) px-4 py-2 text-sm font-medium text-(--color-text-primary) hover:bg-(--color-surface)"
						>
							Voltar para produtos
						</Link>
					</div>
				</div>
			</div>
		</Container>
	);
}
