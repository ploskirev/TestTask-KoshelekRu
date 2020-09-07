// плагин для работы с binance
export default {
  install(Vue) {
    // метод для получения исходного стакана по rest
    Vue.prototype.$getData = async (sym = 'btcusdt') => {
      let data;
      try {
        const res = await fetch(`https://www.binance.com/api/v1/depth?symbol=${sym.toUpperCase()}&limit=500`);
        data = await res.json();
      } catch (err) {
        console.log(err)
      }
      return data;
    }

    // сервис для подписки через сокет
    // connect - подписаться
    // stop - отписаться
    // $socket - позволяет настроить обработку получаемых данных и работать с каналом из компонента
    Vue.prototype.$binanceSocketService = {
      connect(sym  = 'btcusdt') {
        this.$socket = new WebSocket(`wss://stream.binance.com:9443/ws/${sym}@depth`);
      },
      stop() {
        this.$socket.close(1000);
      }
    }
  }
}
