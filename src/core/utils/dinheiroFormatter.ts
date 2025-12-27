export function formatarBRLDeCentavos(valorCentavos: number): string {
  return (valorCentavos / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
