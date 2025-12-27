import Link from "next/link";
import Container from "@/ui/layout/Container";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 border-b border-(--color-border) bg-(--color-background)/90 backdrop-blur">
			<Container className="h-16">
				<div className="flex h-16 items-center justify-between gap-4">
					<Link
						href="/"
						className="text-lg font-semibold tracking-tight text-(--color-text-primary)"
					>
						Store
					</Link>

					<nav className="hidden items-center gap-4 sm:flex">
						<Link
							href="/products"
							className="text-sm text-(--color-text-primary) hover:opacity-80"
						>
							Products
						</Link>
						<Link
							href="/cart"
							className="text-sm text-(--color-text-primary) hover:opacity-80"
						>
							Cart
						</Link>
					</nav>

					<div className="flex items-center gap-3">
						<Link
							href="/login"
							className="text-sm text-(--color-text-primary) hover:opacity-80"
						>
							Login
						</Link>
						<Link
							href="/account"
							className="rounded-md border border-(--color-border)px-3 py-1.5 text-sm text-(--color-text-primary) hover:bg-(--color-surface)"
						>
							Account
						</Link>
					</div>
				</div>
			</Container>
		</header>
	);
}
