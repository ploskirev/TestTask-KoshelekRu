export default function (price, symbol) {
  switch (symbol) {
    case 'btcusdt':
      return new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price);
    case 'bnbbtc':
      return new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 7, maximumFractionDigits: 7 }).format(price);
    case 'ethbtc':
      return new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 6, maximumFractionDigits: 6 }).format(price);
    default:
      return new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price);
  }
}
