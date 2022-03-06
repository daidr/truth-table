<script setup>
import { nextTick, onMounted, ref, watch } from 'vue';

const TransitionWrapperEl = ref();

const props = defineProps({
  show: {
    type: Boolean,
    default: true,
  },
});

const height = ref(0);

onMounted(() => {
  nextTick(() => {
    height.value = TransitionWrapperEl.value.offsetHeight;
    TransitionWrapperEl.value.style.maxHeight = props.show
      ? `${height.value}px`
      : 0;
  });
});

watch(
  () => props.show,
  newVal => {
    TransitionWrapperEl.value.style.maxHeight = newVal
      ? `${height.value}px`
      : 0;
  },
);
</script>

<template>
  <div ref="TransitionWrapperEl" class="transition-wrapper">
    <slot></slot>
  </div>
</template>

<style scoped>
.transition-wrapper {
  transition: max-height 0.15s ease-in-out;
  overflow: hidden;
}
</style>
