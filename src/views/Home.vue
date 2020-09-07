<template>
  <div>
    <loader v-if="loading" />
    <div v-else class="content-wrapper">
      <h1 class="b-heading b-heading_uppercase">{{ sym }}</h1>
      <div class="b-table">
        <div class="b-table__t-head">
          <div class="b-table__th-wrap">
            <div class="b-table__th b-table__th_bold">BID</div>
            <div class="b-table__th b-table__th_bold">ASK</div>
          </div>
          <div class="b-table__th-wrap">
            <div class="b-table__th b-table__th_blue">Amount</div>
            <div class="b-table__th b-table__th_blue">Price</div>
            <div class="b-table__th b-table__th_blue b-table__th-extra">Total</div>
            <div class="b-table__th b-table__th_blue">Amount</div>
            <div class="b-table__th b-table__th_blue">Price</div>
            <div class="b-table__th b-table__th_blue b-table__th-extra">Total</div>
          </div>
        </div>
        <div class="b-table__t-body">
          <div
            class="b-table__inner-col"
            v-for="(type, key) in transformedOrders"
            :key="key"
          >
            <div class="b-table__tr" v-for="item of type" :key="item.price">
              <div class="b-table__td">
                {{ item.amount | amountFilter(sym) }}
              </div>
              <div class="b-table__td">
                {{ item.price | priceFilter(sym) }}
              </div>
              <div class="b-table__td b-table__td-extra">
                {{ (item.amount * item.price) | totalFilter }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../components/Loader.vue';

export default {
  name: 'Home',
  components: {
    Loader,
  },
  data: () => ({
    loading: true,
    sym: 'btcusdt',
    orders: {
      asks: {},
      bids: {},
    },
    transformedOrders: {
      asks: [],
      bids: [],
    },
    fromSocket: {},
  }),
  methods: {
    // метод загружает исходный стакан и преобразовывает полученные данные в объекты
    // для удобства дальнейшей обработки
    // также меняет флаг loading
    async getInitialData() {
      this.loading = true;
      this.orders.asks = {};
      this.orders.bids = {};
      let {asks, bids} = await this.$getData(this.sym);
      asks.forEach(el => {
        this.orders.asks[el[0]] = el[1];
      });
      bids.forEach(el => {
        this.orders.bids[el[0]] = el[1];
      });
      this.combineTransformOrders();
      this.loading = false;
    },
    // метод трансформирует и сортирует данные для дальнейшей отрисовки
    // type - тип заявок (bids или asks)
    transformOrders(type) {
      this.transformedOrders[type] = Object.keys(this.orders[type]).map(key => {
        return {
          price: +key,
          amount: +this.orders[type][key],
        };
      });
      this.transformedOrders[type].sort((a, b) =>
        type === 'asks' ? a.price - b.price : b.price - a.price
      );
    },
    // метод вызывает метод transformOrders для bids и asks и эмитит событие в шину событий
    // так как он вызывается при получении новых данных из сокета
    combineTransformOrders() {
      this.transformOrders('asks');
      this.transformOrders('bids');
      this.$dataPlugin.$emit('newDiff', {
        bestAsk: this.transformedOrders.asks[0].price,
        bestBid: this.transformedOrders.bids[0].price,
      });
    },
    // метод подписывается через сокет на получение обновлений по символу
    // используется плагин, для работы с binance (binance.plugin.js)
    subscribe(sym) {
      this.$binanceSocketService.connect(sym);
      this.$binanceSocketService.$socket.onmessage = event => {
        let data = JSON.parse(event.data);
        this.fromSocket = data;
      };
    },
  },
  watch: {
    // отслеживает получение данных через сокет и обрабатывает их
    fromSocket() {
      const {a: asks, b: bids} = this.fromSocket;
      const fromSocketToUpd = {asks, bids};
      for (let key in fromSocketToUpd) {
        fromSocketToUpd[key].forEach(el => {
          +el[1] === 0
            ? delete this.orders[key][el[0]]
            : (this.orders[key][el[0]] = +el[1]);
        });
      }
      this.combineTransformOrders();
    },
    // отслеживает изменение символа и запускает получение новых данных по новому символу
    // подписывается по новому символу
    async sym() {
      await this.getInitialData();
      this.subscribe(this.sym);
    },
  },
  // запускаем получение данных при создании компонента
  // подписываемся на обновления
  // подписываемся на прослушку шины событий (изменения символа на странице настроек)
  async created() {
    await this.getInitialData();
    this.subscribe(this.sym);
    this.$dataPlugin.$on('symbolChanged', sym => {
      this.$binanceSocketService.stop();
      this.sym = sym;
    });
  },
};
</script>

<style lang="scss" scoped>
.b-heading {
  margin: 20px;
  font-weight: 700;
  text-align: center;

  &_uppercase {
    text-transform: uppercase;
  }
}

.b-table {
  width: 90%;
  margin: 0 auto;

  .b-table__t-head {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .b-table__th-wrap {
      display: flex;
      justify-content: center;
      width: 100%;

      .b-table__th {
        min-width: 83px;
        flex-basis: 83px;
        flex-shrink: 0;
        flex-grow: 1;
        text-align: center;

        &_bold {
          font-weight: 700;
        }

        &_blue {
          color: #2c3e50;
        }
      }
    }
  }

  .b-table__t-body {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: calc(100vh - 210px);
    overflow-y: auto;
    padding-right: 5px;
    text-align: center;

    .b-table__inner-col {
      flex-grow: 1;
    }

    .b-table__tr {
      display: flex;
      width: 100%;
      margin: 0 auto;

      &:last-child {
        border-bottom: 1px solid grey;
      }

      .b-table__td {
        border-left: 1px solid grey;
        border-top: 1px solid grey;
        min-width: 83px;
        flex-basis: 83px;
        flex-shrink: 0;
        flex-grow: 1;

        &:last-child {
          border-right: 1px solid grey;
        }
      }
    }
  }
}

.b-table__t-body:hover {
  padding-right: 0;
}

.b-table__t-body:hover::-webkit-scrollbar {
  width: 5px;
}

.b-table__t-body:hover::-webkit-scrollbar-thumb {
  background: #2c3e50;
}

@media (max-width: 768px) {
  .b-table__th-extra,
  .b-table__td-extra {
    display: none;
  }

  .b-table__td:nth-child(2) {
    border-right: 1px solid grey;
  }
}

@media (max-width: 576px) {
  h1 {
    font-size: 24px;
  }

  .b-table {
    font-size: 14px;
    width: 100%;

    .b-table__t-body {
      height: calc(100vh - 190px);
    }
  }
}
</style>
