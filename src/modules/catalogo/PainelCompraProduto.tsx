"use client";

import { useMemo, useState } from "react";
import type { Produto, VarianteProduto } from "@/core/domain/produto";
import { formatarBRLDeCentavos } from "@/core/utils/dinheiroFormatter";
import ChipOpcao from "@/ui/components/ChipOpcao";

type Props = {
	produto: Produto;
};

function obterMenorPrecoCentavos(produto: Produto): number {
	return Math.min(...produto.variantes.map((v) => v.precoCentavos));
}

function encontrarVarianteSelecionada(
	produto: Produto,
	selecao: Record<string, string>
): VarianteProduto | undefined {
	// Se o produto não tem opções, ele tem uma variante "única"
	if (produto.nomesOpcoes.length === 0) return produto.variantes[0];

	const nomes = produto.nomesOpcoes;

	// Se não selecionou tudo ainda, não retorna variante
	const selecaoCompleta = nomes.every((nome) => Boolean(selecao[nome]));
	if (!selecaoCompleta) return undefined;

	return produto.variantes.find((v) =>
		nomes.every((nome) => v.opcoes[nome] === selecao[nome])
	);
}

function valoresDisponiveisPorOpcao(
	produto: Produto
): Record<string, string[]> {
	const mapa: Record<string, Set<string>> = {};

	for (const nome of produto.nomesOpcoes) {
		mapa[nome] = new Set<string>();
	}

	for (const v of produto.variantes) {
		for (const nome of produto.nomesOpcoes) {
			const val = v.opcoes[nome];
			if (val) mapa[nome].add(val);
		}
	}

	const resultado: Record<string, string[]> = {};
	for (const nome of produto.nomesOpcoes) {
		resultado[nome] = Array.from(mapa[nome]).sort((a, b) => a.localeCompare(b));
	}

	return resultado;
}

function selecaoEstaCompleta(
	produto: Produto,
	selecao: Record<string, string>
) {
	if (produto.nomesOpcoes.length === 0) return true;
	return produto.nomesOpcoes.every((nome) => Boolean(selecao[nome]));
}

/**
 * Retorna true se existir alguma variante que case com a seleção parcial.
 * Ex: selecaoParcial = { cor: "Branco" } deve retornar true se houver qualquer variante com cor Branco.
 * Ex: selecaoParcial = { cor: "Branco", tamanho: "M" } deve retornar true se existir exatamente essa combinação.
 */
function existeVarianteComSelecaoParcial(
	produto: Produto,
	selecaoParcial: Record<string, string>
) {
	const nomesSelecionados = Object.keys(selecaoParcial);

	return produto.variantes.some((v) =>
		nomesSelecionados.every((nome) => v.opcoes[nome] === selecaoParcial[nome])
	);
}

export default function PainelCompraProduto({ produto }: Props) {
	const [selecao, setSelecao] = useState<Record<string, string>>({});

	const opcoes = useMemo(() => valoresDisponiveisPorOpcao(produto), [produto]);

	const varianteSelecionada = useMemo(
		() => encontrarVarianteSelecionada(produto, selecao),
		[produto, selecao]
	);

	const selecaoCompleta = useMemo(
		() => selecaoEstaCompleta(produto, selecao),
		[produto, selecao]
	);

	const combinacaoInexistente = selecaoCompleta && !varianteSelecionada;

	const precoExibido = useMemo(() => {
		if (varianteSelecionada) return varianteSelecionada.precoCentavos;
		return obterMenorPrecoCentavos(produto);
	}, [produto, varianteSelecionada]);

	const textoPreco = formatarBRLDeCentavos(precoExibido);

	const estoque = varianteSelecionada?.estoque ?? null;
	const podeComprar = Boolean(
		varianteSelecionada && varianteSelecionada.estoque > 0
	);

	function selecionar(nomeOpcao: string, valor: string) {
		setSelecao((prev) => {
			// toggle: se clicar no mesmo valor, desmarca
			if (prev[nomeOpcao] === valor) {
				const novo = { ...prev };
				delete novo[nomeOpcao];
				return novo;
			}
			return { ...prev, [nomeOpcao]: valor };
		});
	}

	return (
		<div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-4">
			<div className="flex items-end justify-between gap-3">
				<div>
					<p className="text-xs uppercase tracking-wide text-(--color-text-secondary)">
						{varianteSelecionada ? "Preço" : "A partir de"}
					</p>
					<p className="mt-1 text-2xl font-semibold text-(--color-text-primary)">
						{textoPreco}
					</p>
				</div>

				<span className="rounded-full border border-(--color-border) bg-(--color-background) px-3 py-1 text-xs text-(--color-text-secondary)">
					{produto.variantes.length} variante(s)
				</span>
			</div>

			{/* Seleção de opções */}
			{produto.nomesOpcoes.length > 0 ? (
				<div className="mt-5 flex flex-col gap-4">
					{produto.nomesOpcoes.map((nomeOpcao) => (
						<div key={nomeOpcao} className="flex flex-col gap-2">
							<div className="flex items-center justify-between">
								<p className="text-sm font-medium text-(--color-text-primary)">
									{nomeOpcao}
								</p>
								<p className="text-xs text-(--color-text-secondary)">
									{selecao[nomeOpcao]
										? `Selecionado: ${selecao[nomeOpcao]}`
										: "Selecione"}
								</p>
							</div>

							<div className="flex flex-wrap gap-2">
								{opcoes[nomeOpcao]?.map((valor) => {
									const selecaoTeste = { ...selecao, [nomeOpcao]: valor };
									const permitido = existeVarianteComSelecaoParcial(
										produto,
										selecaoTeste
									);

									return (
										<button
											key={valor}
											type="button"
											onClick={() => selecionar(nomeOpcao, valor)}
											disabled={!permitido}
											className={[
												"rounded-full",
												!permitido ? "cursor-not-allowed opacity-40" : "",
											].join(" ")}
										>
											<ChipOpcao
												texto={valor}
												ativo={selecao[nomeOpcao] === valor}
											/>
										</button>
									);
								})}
							</div>
						</div>
					))}
				</div>
			) : null}

			{/* Status de estoque */}
			<div className="mt-4">
				{produto.nomesOpcoes.length > 0 && !selecaoCompleta ? (
					<p className="text-sm text-(--color-text-secondary)">
						Selecione as opções acima. Opções inválidas ficam desabilitadas.
					</p>
				) : combinacaoInexistente ? (
					<p className="text-sm font-medium text-red-600">
						Combinação indisponível
					</p>
				) : estoque === null ? null : estoque > 0 ? (
					<p className="text-sm text-(--color-text-secondary)">
						Em estoque:{" "}
						<span className="font-semibold text-(--color-text-primary)">
							{estoque}
						</span>
					</p>
				) : (
					<p className="text-sm font-medium text-red-600">Indisponível</p>
				)}
			</div>

			{/* Ações */}
			<div className="mt-5 flex flex-col gap-2 sm:flex-row">
				<button
					type="button"
					disabled={!podeComprar}
					className={[
						"h-11 w-full rounded-xl px-4 text-sm font-medium sm:w-auto",
						podeComprar
							? "bg-(--color-accent) text-white hover:opacity-95"
							: "cursor-not-allowed bg-gray-200 text-gray-500",
					].join(" ")}
				>
					Adicionar ao carrinho
				</button>

				<button
					type="button"
					onClick={() => setSelecao({})}
					className="h-11 w-full rounded-xl border border-(--color-border) bg-(--color-background) px-4 text-sm font-medium text-(--color-text-primary) hover:bg-(--color-surface) sm:w-auto"
				>
					Limpar seleção
				</button>
			</div>
		</div>
	);
}
