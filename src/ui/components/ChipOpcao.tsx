type ChipOpcaoProps = {
	texto: string;
	ativo?: boolean;
};

export default function ChipOpcao({ texto, ativo }: ChipOpcaoProps) {
	return (
		<span
			className={[
				"inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
				ativo
					? "border-(--color-accent) bg-(--color-accent) text-white"
					: "border-(--color-border) bg-(--color-background) text-(--color-text-primary)",
			].join(" ")}
		>
			{texto}
		</span>
	);
}
