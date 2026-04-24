export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNairaShort(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}
