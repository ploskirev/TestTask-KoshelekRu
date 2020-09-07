export default function (amount, symbol) {
  switch (symbol) {
    case 'btcusdt':
      return new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 5, maximumFractionDigits: 5 }).format(amount);
    case 'bnbbtc':
      return new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
    case 'ethbtc':
      return new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(amount);
    default:
      return new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
  }
}
