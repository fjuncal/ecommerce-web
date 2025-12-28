import Container from "@/ui/layout/Container";
import { buscarProdutoPorSlug } from "@/core/utils/produtos";
import { formatarBRLDeCentavos } from "@/core/utils/dinheiroFormatter";
import ChipOpcao from "@/ui/components/ChipOpcao";
import Link from "next/link";

type PageProps = {
	params: Promise<{
		slug: string;
	}>;
};

function menorPrecoCentavos(precos: number[]) {
	return Math.min(...precos);
}

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

	const precoAPartir = formatarBRLDeCentavos(
		menorPrecoCentavos(produto.variantes.map((v) => v.precoCentavos))
	);

	const imagemPrincipal = produto.imagens[0];
	const miniaturas = produto.imagens.slice(0, 4);

	return (
		<Container>
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
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

				<div className="flex flex-col gap-4">
					<div>
						<h1 className="text-3xl font-semibold tracking-tight text-(--color-text-primary)">
							{produto.titulo}
						</h1>
						<p className="mt-2 text-(--color-text-secondary)">
							{produto.descricao}
						</p>
					</div>

					<div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-4">
						<div className="flex items-end justify-between gap-3">
							<div>
								<p className="text-xs uppercase tracking-wide text-(--color-text-secondary)">
									A partir de
								</p>
								<p className="mt-1 text-2xl font-semibold text-(--color-text-primary)">
									{precoAPartir}
								</p>
							</div>

							<span className="rounded-full border border-(--color-border) bg-(--color-background) px-3 py-1 text-xs text-(--color-text-secondary)">
								{produto.variantes.length} variante(s)
							</span>
						</div>

						{produto.nomesOpcoes.length > 0 ? (
							<div className="mt-4 flex flex-col gap-3">
								<p className="text-sm font-medium text-(--color-text-primary)">
									Opções disponíveis
								</p>

								<div className="flex flex-wrap gap-2">
									{produto.variantes.slice(0, 8).map((v) => {
										const texto = Object.entries(v.opcoes)
											.map(([k, val]) => `${k}: ${val}`)
											.join(" • ");

										return <ChipOpcao key={v.id} texto={texto} />;
									})}
								</div>

								<p className="text-xs text-(--color-text-secondary)">
									Seleção de variante entra no próximo passo.
								</p>
							</div>
						) : null}

						<div className="mt-5 flex flex-col gap-2 sm:flex-row">
							<button
								type="button"
								className="h-11 w-full rounded-xl bg-(--color-accent) px-4 text-sm font-medium text-white hover:opacity-95 sm:w-auto"
							>
								Adicionar ao carrinho
							</button>

							<Link
								href="/produtos"
								className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-(--color-border) bg-(--color-background) px-4 text-sm font-medium text-(--color-text-primary) hover:bg-(--color-surface) sm:w-auto"
							>
								Voltar
							</Link>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
}
