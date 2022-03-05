<script lang="ts" setup>
import { computed, PropType, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface Tree {
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
    props.item.constructor.name != 'VariableContext',
);
const toggle = () => {
  if (isFolder.value) {
    isOpen.value = !isOpen.value;
  }
};
</script>

<template>
  <li class="select-none">
    <div
      :class="{
        bold: isFolder,
        isError:
          item.constructor.name == 'ErrorNodeImpl' ||
          item.constructor.name == 'ExprContext',
      }"
      @click="toggle"
      class="tree-item"
    >
      <span v-if="isFolder" class="angle" :class="{ isOpen }">
        <Icon icon="uil:angle-right-b" />
      </span>
      {{
        item.constructor.name == 'ExprContext'
          ? `<${t('tree.unknown')}>`
          : item.getText()
      }}
    </div>
    <ul v-if="isFolder" v-show="isOpen">
      <Tree
        class="item"
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
      ></Tree>
    </ul>
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
  @apply pl-8;
}
</style>
