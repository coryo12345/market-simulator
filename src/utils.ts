export function formatMoney(val: number | string): string {
  if (typeof val === 'string') {
    val = parseFloat(val);
  }
  return (
    '$' +
    val.toLocaleString('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })
  );
}
