<script lang="ts" setup>
import { PropType } from 'vue';

defineProps({
  usedVaribles: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  subsequencesResult: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  showIntermediateProcesses: {
    type: Boolean,
    default: true,
  },
  inputValue: {
    type: String,
    default: '',
  },
  finalResult: {
    type: Array as PropType<{ values: { key: string } }[]>,
    default: '',
  },
});
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="variable of usedVaribles" :key="variable" class="level-1">
          {{ variable }}
        </th>
        <template v-if="showIntermediateProcesses">
          <th
            v-for="subsequenceName of subsequencesResult"
            :key="subsequenceName"
            class="level-2"
          >
            {{ subsequenceName }}
          </th>
        </template>
        <th class="level-3">
          {{ inputValue.replace(/\s/g, '') }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="result of finalResult">
        <td v-for="variable of usedVaribles" class="level-1">
          {{ result.values[variable] }}
        </td>
        <template v-if="showIntermediateProcesses">
          <td v-for="subsequenceName of subsequencesResult" class="level-2">
            {{ result.values[subsequenceName] }}
          </td>
        </template>
        <td class="level-3">
          {{ result.values[inputValue.replace(/\s/g, '')] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  @apply table-auto min-w-full max-h-10 overflow-y-scroll;
  @apply rounded-lg;
  border-collapse: separate;
  border-spacing: 0px 5px;
}

th,
td {
  @apply min-w-6 text-center px-2;
  @apply space-y-1;
}

th.level-1,
td.level-1 {
  @apply bg-purple-300/50 dark:bg-dark-900/50;
}

th.level-2,
td.level-2 {
  @apply bg-purple-300/70 dark:bg-dark-900/70;
}

th.level-3,
td.level-3 {
  @apply bg-purple-300/90 dark:bg-dark-900/90;
}

td:first-child,
th:first-child {
  @apply rounded-l-lg;
}

td:last-child,
th:last-child {
  @apply rounded-r-lg;
}

th {
  @apply sticky top-0 rounded-none;
}

tbody {
  @apply max-h-10 overflow-y-scroll;
}
</style>
