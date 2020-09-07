<template>
  <div id="app">
    <Header />
    <ContentBlock />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import ContentBlock from '@/components/ContentBlock.vue';

export default {
  name: 'App',
  components: {Header, ContentBlock},
};
</script>

<style lang="scss">
body {
  overflow: hidden;
}
</style>
