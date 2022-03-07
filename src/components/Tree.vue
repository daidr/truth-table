<script lang="ts" setup>
import { computed, nextTick, PropType, ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { useI18n } from 'vue-i18n';
import LogicParser from '../utils/LogicParser.js';

const { t } = useI18n();

interface Tree {
  isErrorNode: Function;
  getText: Function;
  children?: Tree[];
}

const props = defineProps({
  item: {
    type: Object as PropType<Tree>,
    default: () => ({
      getText: () => '',
      children: [],
    }),
  },
});

const isOpen = ref(true);
const isFolder = computed(
  () =>
    props.item.children &&
    props.item.children.length &&
    props.item.constructor != LogicParser.VariableContext,
);
const toggle = () => {
  if (isFolder.value) {
    isOpen.value = !isOpen.value;
  }
};

const refresh = ref(true)

watch(() => props.item, () => {
  refresh.value = false;
  nextTick(() => {
    refresh.value = true;
  })
})
</script>

<template>
  <li class="select-none">
    <div
      :class="{
        bold: isFolder,
        isError:
          (item.isErrorNode && item.isErrorNode()) ||
          item.constructor == LogicParser.ExprContext,
      }"
      @click="toggle"
      class="tree-item"
    >
      <span v-if="isFolder" class="angle" :class="{ isOpen }">
        <Icon icon="uil:angle-right-b" />
      </span>
      {{
        item.constructor == LogicParser.ExprContext
          ? `<${t('tree.unknown')}>`
          : item.getText()
      }}
    </div>
    <TransitionHeight v-if="isFolder && refresh" :show="isOpen">
      <ul>
        <Tree class="item" v-for="(child, index) in item.children" :key="index" :item="child"></Tree>
      </ul>
    </TransitionHeight>
  </li>
</template>

<style scoped>
.angle {
  @apply text-xl inline-flex transition transform-gpu rotate-0 m-1 bg-purple-400/50 dark:bg-gray-600/50 rounded-md;
}
.angle.isOpen {
  @apply rotate-90;
}
.tree-item:hover .angle {
  @apply bg-purple-400 dark:bg-gray-600 text-white;
}

.tree-item {
  @apply flex items-center gap-x-2;
  @apply bg-purple-300 dark:bg-gray-900 my-1 px-2 rounded-md;
  @apply min-w-30;
}

.isError {
  @apply text-red-700 dark:text-warm-gray-400;
  @apply bg-red-200 dark:bg-warm-gray-900;
}

.bold {
  @apply font-bold cursor-pointer;
}

ul {
  @apply pl-8 relative;
  @apply flex flex-col gap-y-0.1px;
}

ul::after {
  content: "";
  @apply absolute top-0 left-5.5 bottom-0 w-0.5 bg-purple-300 dark:bg-gray-600 rounded-full;
}
</style>
