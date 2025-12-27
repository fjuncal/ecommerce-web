type SearchInputProps = {
	placeholder?: string;
};

export default function SearchInput({ placeholder }: SearchInputProps) {
	return (
		<div className="relative w-full">
			<input
				type="text"
				placeholder={placeholder ?? "Search products..."}
				className="h-10 w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3 text-sm text-(--color-text-primary) outline-none placeholder:text-(--color-text-secondary) focus:border-(--color-accent)"
			/>
		</div>
	);
}
