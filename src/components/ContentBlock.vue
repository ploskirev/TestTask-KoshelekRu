<template>
  <div class="wrapper">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  height: calc(100vh - 50px);
  padding: 10px;
}

@media (max-width: 576px) {
  .wrapper {
    padding: 10px 5px;
  }
}
</style>
