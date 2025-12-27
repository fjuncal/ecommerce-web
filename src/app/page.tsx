import Container from "@/ui/layout/Container";
import Link from "next/link";

export default function Home() {
	return (
		<Container>
			<div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-6">
				<h1 className="text-3xl font-semibold tracking-tight text-(--color-text-primary)">
					Your store, any theme.
				</h1>
				<p className="mt-2 max-w-2xl text-(--color-text-secondary)">
					A professional, generic e-commerce foundation. Swap branding,
					categories, and content without rewriting the system.
				</p>

				<div className="mt-6 flex flex-wrap gap-3">
					<Link
						href="/products"
						className="inline-flex rounded-lg bg-(--color-accent) px-4 py-2 text-sm font-medium text-white hover:opacity-95"
					>
						Browse products
					</Link>
					<Link
						href="/account"
						className="inline-flex rounded-lg border border-(--color-border) bg-(--color-background) px-4 py-2 text-sm font-medium text-(--color-text-primary) hover:bg-(--color-surface)"
					>
						My account
					</Link>
				</div>
			</div>
		</Container>
	);
}
