<template>
  <div>
    <b-form-select
      v-model="selected"
      @change="changeSymbol"
      :options="options"
      size="sm"
      class="mt-3"
    ></b-form-select>
    <p class="mt-3">Selected: {{ selected }}</p>
    <ul class="b-msg-content">
      <li v-for="(msg, idx) of diffsInfo" :key="idx">
        <article class="b-msg-content__diffmsg-wrap">
          <div class="b-msg-content__bestbid-label">Best BID</div>
          <div class="b-msg-content__bestbid-price">
            {{ msg.bestBid | priceFilter(selected) }}
          </div>
          <div class="b-msg-content__bestask-label">Best ASK</div>
          <div class="b-msg-content__bestask-price">
            {{ msg.bestAsk | priceFilter(selected) }}
          </div>
        </article>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: 'btcusdt',
      diffsInfo: [],
      options: [
        {value: 'btcusdt', text: 'BTCUSDT'},
        {value: 'bnbbtc', text: 'BNBBTC'},
        {value: 'ethbtc', text: 'ETHBTC'},
      ],
    };
  },
  methods: {
    // метод для эмита события смены символа в шину
    // очищает список записей diffsInfo
    changeSymbol() {
      this.$dataPlugin.$emit('symbolChanged', this.selected);
      this.diffsInfo = [];
    },
  },
  // подписываемся на прослушку события получения новых данных
  created() {
    this.$dataPlugin.$on('newDiff', data => {
      const preparedData = {
        bestBid: data.bestBid,
        bestAsk: data.bestAsk,
      };
      this.diffsInfo.unshift(preparedData);
    });
  },
};
</script>

<style lang="scss" scoped>
p {
  text-align: center;
}

.b-msg-content {
  overflow-y: auto;
  height: calc(100vh - 190px);
}

.b-msg-content__diffmsg-wrap {
  display: grid;
  width: 400px;
  margin: 20px auto;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 40px 40px;
  text-align: center;

  div {
    padding: 10px 0;
  }

  [class$='label'] {
    border-right: 1px solid grey;
  }

  [class*='bid'] {
    border-bottom: 1px solid grey;
  }
}

li:first-child {
  color: #d19a22;

  div[class$='label'],
  div[class*='bid'] {
    border-color: #d19a22;
  }
}

@media (max-width: 576px) {
  .b-msg-content {
    font-size: 14px;

    .b-msg-content__diffmsg-wrap {
      width: 300px;
    }
  }
}
</style>
