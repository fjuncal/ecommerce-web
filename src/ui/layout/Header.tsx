import Link from "next/link";
import Container from "@/ui/layout/Container";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 border-b border-(--color-border) bg-(--color-background)/90 backdrop-blur">
			<Container>
				<div className="flex h-16 items-center justify-between gap-3">
					{/* Brand */}
					<Link
						href="/"
						className="shrink-0 text-lg font-semibold tracking-tight text-(--color-text-primary)"
					>
						Loja
					</Link>

					{/* Actions */}
					<div className="flex shrink-0 items-center gap-2">
						<Link
							href="/produtos"
							className="hidden rounded-lg px-3 py-2 text-sm text-(--color-text-primary) hover:bg-(--color-surface) sm:inline-flex"
						>
							Produtos
						</Link>

						<Link
							href="/carrinho"
							className="inline-flex items-center rounded-lg border border-(--color-border) px-3 py-2 text-sm text-(--color-text-primary) hover:bg-(--color-surface)"
						>
							Carrinho
							<span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-(--color-accent) px-1.5 text-xs font-semibold text-white">
								0
							</span>
						</Link>

						<Link
							href="/login"
							className="hidden rounded-lg px-3 py-2 text-sm text-(--color-text-primary) hover:bg-(--color-surface) sm:inline-flex"
						>
							Login
						</Link>

						<Link
							href="/account"
							className="inline-flex rounded-lg bg-(--color-accent) px-3 py-2 text-sm font-medium text-white hover:opacity-95"
						>
							Account
						</Link>
					</div>
				</div>
			</Container>
		</header>
	);
}
