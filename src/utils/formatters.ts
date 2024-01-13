export function formatterOnlyNumbers(str: string) {
  if (!str) return;
  return str.replace(/\D/g, "");
}

export function formatterDate(str: string) {
  if (!str) return;

  const year = str.slice(0, 4);
  const morth = str.slice(5, 7);
  const day = str.slice(8, 10);
  return day + "/" + morth + "/" + year;
}

export function formatterCoin(num: number) {
  if (!num) return;

  const float = parseFloat(String(num)) / 100;

  return float.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}

export function formatterPhoneNumber(str: string) {
  if (!str) return;

  const numbers = str.replace(/\D/g, "");

  if (numbers.length !== 11) {
    return numbers;
  }

  const brazilianFormat = numbers.replace(
    /^(\d{2})(\d{1})(\d{4})(\d{4})$/,
    "($1) $2 $3-$4"
  );

  return brazilianFormat;
}

export function formatterCPF(str: string) {
  if (!str) return;

  const numeros = String(str).replace(/\D/g, "");

  if (numeros.length !== 11) {
    return str;
  }

  const formatCPF = numeros.replace(
    /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
    "$1.$2.$3-$4"
  );

  return formatCPF;
}
