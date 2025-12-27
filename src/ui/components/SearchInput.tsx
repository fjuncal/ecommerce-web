"use client";

type SearchInputProps = {
	placeholder?: string;
};

export default function SearchInput({ placeholder }: SearchInputProps) {
	return (
		<div className="flex w-full items-stretch gap-2">
			<input
				type="text"
				placeholder={placeholder ?? "Buscar..."}
				className="h-11 w-full rounded-xl border border-(--color-border) bg-(--color-background) px-4 text-sm text-(--color-text-primary) outline-none placeholder:text-(--color-text-secondary) focus:border-(--color-accent)"
			/>

			<button
				type="button"
				className="h-11 shrink-0 rounded-xl bg-(--color-accent) px-4 text-sm font-medium text-white hover:opacity-95"
			>
				Buscar
			</button>
		</div>
	);
}
