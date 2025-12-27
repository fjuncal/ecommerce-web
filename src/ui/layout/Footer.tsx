import Container from "@/ui/layout/Container";

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="mt-16 border-t border-(--color-border) bg-(--color-surface)">
			<Container>
				<div className="flex flex-col gap-2 py-10 text-sm text-(--color-text-secondary) sm:flex-row sm:items-center sm:justify-between">
					<span>© {year} Store</span>
					<span className="opacity-80">Generic e-commerce template</span>
				</div>
			</Container>
		</footer>
	);
}
