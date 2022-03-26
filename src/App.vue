<script lang="ts" setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Pages from './pages/index.vue';
import disableZoom from './utils/disableZoom';

disableZoom();
</script>

<template>
  <div class="container max-w-screen-2xl mx-auto min-h-95vh relative pb-20">
    <Header />
    <Pages />
    <Footer />
  </div>
</template>
