import Container from "@/ui/layout/Container";
import SearchInput from "@/ui/components/SearchInput";
import ProdutoCard from "@/ui/components/ProdutoCard";
import { MOCK_PRODUTOS } from "@/core/config/mock-produtos";

export default function ProdutosPage() {
	return (
		<Container>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-semibold text-(--color-text-primary)">
						Produtos
					</h1>
					<p className="text-(--color-text-secondary)">
						Navegue pelo catálogo.
					</p>
				</div>

				<div className="max-w-xl">
					<SearchInput
						placeholder="Buscar produtos..."
					/>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{MOCK_PRODUTOS.map((p) => (
						<ProdutoCard key={p.id} produto={p} />
					))}
				</div>
			</div>
		</Container>
	);
}
