<script lang="ts" setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="container max-w-screen-2xl mx-auto min-h-95vh relative">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>
