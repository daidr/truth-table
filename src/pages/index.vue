<script lang="ts" setup>
import { ref, watch, reactive, computed, Ref, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '../store';
import antlr4 from 'antlr4';
import { ErrorListener } from 'antlr4/src/antlr4/error';
import LogicLexer from '../utils/LogicLexer.js';
import LogicParser from '../utils/LogicParser.js';
import LogicListener from '../utils/LogicListener.js';
import TruthTable from '../components/TruthTable.vue';
import { getCursorPosition, setCursorPosition } from '../utils/cursor';
import FloatInputBtnGroup from '../components/FloatInputBtnGroup.vue';

const { t } = useI18n();

const store = useStore();

const MainInputEl = ref();
let currentInputPos = 0;
const inputValue = ref('');

const RawTokens = ref([]);

interface Tree {
  getText: Function;
  children?: Tree[];
}

const RawTree = ref(false) as Ref<Boolean | Tree>;

const inDebugMode = computed(() => store.$state.inDebugMode);

const errorMsg = ref('');
const errorMsgData = ref({ text: '', params: {} });

const handleInputNotions = (value: string): string => {
  return value
    .replace(/[!！┐1]/g, '¬')
    .replace(/[》>.。]/g, '→')
    .replace(/[【{\[（]/g, '(')
    .replace(/[】}\]）]/g, ')')
    .replace(/[=↔+]/g, '⇔')
    .replace(/[&^∧67]/g, '⋀')
    .replace(/[|∨\\、]/g, '⋁')
    .replace(/\s{2,}/g, ' ')
    .replace(/[^A-Za-z ¬→⇔⋀⋁()]/g, '')
    .trimStart();
};

let finalFunctionStr = '';
let finalFunction: Function;

const finalResult = reactive([]);

const usedVaribles = ref([]);
const usedSubsequences = reactive([]);
let usedParSubsequences = [];

const subsequencesResult = ref([]);

const addSubsequences = ctx => {
  usedSubsequences.push(ctx.getText());
};

class CustomErrorListener extends ErrorListener {
  constructor() {
    super();
  }

  syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
    setTimeout(() => {
      errorMsg.value = 'handled error';
      errorMsgData.value = {
        text: 'parser.error.syntax',
        params: { column, msg },
      };
    }, 10);
  }
}
const errorListener = new CustomErrorListener();

const calcTruthTable = () => {
  // 获取变量个数
  const varsCount = usedVaribles.value.length;

  // 对变量进行排序
  usedVaribles.value = [...usedVaribles.value.sort()];

  // 对应真值表的行数
  const rowsCount = Math.pow(2, varsCount);

  // 初始化真值表变元
  const rows = [];
  for (let i = 0; i < rowsCount; i++) {
    rows.push(i.toString(2).padStart(varsCount, '0').split('').map(Number));
  }

  // 生成真值表
  for (let i = 0; i < rows.length; i++) {
    // 让varsCount作为values的键名
    const values = {};
    for (let j = 0; j < varsCount; j++) {
      values[usedVaribles.value[j]] = rows[i][j];
    }
    finalResult.push({ values, result: finalFunction(values) });
  }

  // 中间过程名称排序和过滤
  if (finalResult.length == 0) return;
  let keys = Object.keys(finalResult[0].values);
  keys = keys.filter(
    key =>
      !usedVaribles.value.includes(key) &&
      key != inputValue.value.replace(/\s/g, '') &&
      usedSubsequences.includes(key),
  );
  if (keys.length != 0) {
    subsequencesResult.value = keys.sort(
      (a, b) => finalResult[0].values[a] - finalResult[0].values[b],
    );
  }
};

class VariableCount extends LogicListener {
  constructor() {
    super();
  }

  enterProg(ctx) {
    usedVaribles.value = [];
    usedParSubsequences = [];
    subsequencesResult.value = [];
    RawTree.value = false;
    finalResult.splice(0);
    usedSubsequences.splice(0);
    finalFunctionStr = `let data=values;\n`;
  }

  exitProg(ctx) {
    if (ctx.getText() !== inputValue.value.replace(/\s/g, '')) {
      errorMsg.value = 'handled error';
      errorMsgData.value = { text: 'parser.error.notvaild', params: {} };
      return;
    }
    finalFunction = new Function('values', finalFunctionStr);
    calcTruthTable();
  }

  exitPar(ctx) {
    if (usedParSubsequences.includes(ctx.getText())) {
      return;
    }
    usedParSubsequences.push(ctx.getText());
    finalFunctionStr += `data["${ctx.getText()}"] = data["${ctx
      .expr()
      .getText()}"];\n`;
  }

  exitDisjunction(ctx) {
    if (usedSubsequences.includes(ctx.getText())) {
      return;
    }
    addSubsequences(ctx);
    finalFunctionStr += `data["${ctx.getText()}"] = data["${ctx
      .expr(0)
      .getText()}"] || data["${ctx.expr(1).getText()}"];\n`;
  }

  exitVariable(ctx) {
    usedVaribles.value = [...new Set([...usedVaribles.value, ctx.getText()])];
  }

  exitReverse(ctx) {
    if (usedSubsequences.includes(ctx.getText())) {
      return;
    }
    addSubsequences(ctx);
    finalFunctionStr += `data["${ctx.getText()}"] = Number(!data["${ctx
      .expr(0)
      .getText()}"]);\n`;
  }

  exitEquivalence(ctx) {
    if (usedSubsequences.includes(ctx.getText())) {
      return;
    }
    addSubsequences(ctx);
    finalFunctionStr += `data["${ctx.getText()}"] = Number(data["${ctx
      .expr(0)
      .getText()}"] == data["${ctx.expr(1).getText()}"]);\n`;
  }

  exitConjunction(ctx) {
    if (usedSubsequences.includes(ctx.getText())) {
      return;
    }
    addSubsequences(ctx);
    finalFunctionStr += `data["${ctx.getText()}"] = data["${ctx
      .expr(0)
      .getText()}"] && data["${ctx.expr(1).getText()}"];\n`;
  }

  exitImplication(ctx) {
    if (usedSubsequences.includes(ctx.getText())) {
      return;
    }
    addSubsequences(ctx);
    finalFunctionStr += `data["${ctx.getText()}"] = Number(data["${ctx
      .expr(0)
      .getText()}"] == 0 ? 1: data["${ctx.expr(1).getText()}"]);\n`;
  }
}

const variableCount = new VariableCount();

watch(
  () => inputValue.value,
  (oldVal, newVal) => {
    if (oldVal != newVal) {
      errorMsg.value = '';
      try {
        let pos = getCursorPosition(MainInputEl.value);
        inputValue.value = handleInputNotions(inputValue.value);
        nextTick(() => {
          setCursorPosition(MainInputEl.value, pos);
        });

        const chars = new antlr4.InputStream(
          inputValue.value.replace(/\s/g, ''),
        );
        const lexer = new LogicLexer(chars);
        const tokens = new antlr4.CommonTokenStream(lexer);
        RawTokens.value = tokens.tokens;
        const parser = new LogicParser(tokens);
        parser.addErrorListener(errorListener);
        //parser.buildParseTrees = true;
        const tree = parser.prog();
        antlr4.tree.ParseTreeWalker.DEFAULT.walk(variableCount, tree);
        RawTree.value = tree;
      } catch (error) {
        errorMsg.value = error.message;
        console.error(error);
      }
    }
  },
);

const isInputFocused = ref(false);

const handleBlur = () => {
  currentInputPos = getCursorPosition(MainInputEl.value);
  isInputFocused.value = false;
};

const handleFocus = () => {
  isInputFocused.value = true;
};

const onInputBtnClick = (char: string) => {
  inputValue.value = inputValue.value.slice(0, currentInputPos) + char + inputValue.value.slice(currentInputPos);
  setTimeout(() => {
    MainInputEl.value.focus();
    setCursorPosition(MainInputEl.value, currentInputPos + 1);
  }, 10);
};
</script>

<template>
  <div class="wrapper" :class="{ horizontal: store.$state.layoutHorizontal }">
    <div class="left">
      <input
        ref="MainInputEl"
        v-model="inputValue"
        class="main-input"
        :placeholder="t('input.placeholder')"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      <div
        v-if="errorMsg != '' && inputValue.replace(/\s/g, '') != ''"
        class="inner-wrapper error-wrapper"
        :data-title="t('parser.error.title')"
      >
        <p v-if="errorMsg != 'handled error'">{{ errorMsg }}</p>
        <p v-else>{{ t(errorMsgData.text, errorMsgData.params) }}</p>
      </div>
      <div v-if="inDebugMode" class="inner-wrapper" :data-title="t('lexer.title')">
        <div class="scroll-wrapper text-sm">
          <code v-for="(rawToken, index) of RawTokens" :key="index" class="whitespace-pre">
            {{ t('lexer.startpos') }}
            {{ rawToken.start.toString().padEnd(3) }}
            {{ t('lexer.stoppos') }} {{ rawToken.stop.toString().padEnd(3) }}
            {{ t('lexer.type') }}
            {{
              (rawToken.type == -1
                ? 'EOF'
                : LogicParser.symbolicNames[rawToken.type]
              ).padEnd(12)
            }}
            {{ t('lexer.value') }} {{ rawToken.text }}
            <br />
          </code>
        </div>
      </div>
      <div v-if="inDebugMode" class="inner-wrapper" :data-title="t('parser.title')">
        <div class="scroll-wrapper">
          <div class="used-variables">
            {{ t('parser.used-var') }}
            <span v-if="usedVaribles.length == 0">
              {{
                t('parser.used-var.empty')
              }}
            </span>
            <span v-for="variable of usedVaribles" :key="variable">
              {{
                variable
              }}
            </span>
          </div>
          <div class="used-subsequences">
            {{ t('parser.used-subsequence') }}
            <span v-if="usedSubsequences.length == 0">
              {{
                t('parser.used-var.empty')
              }}
            </span>
            <span v-for="subsequence of usedSubsequences" :key="subsequence">
              {{
                subsequence
              }}
            </span>
          </div>
          <div class="used-subsequences">
            {{ t('parser.tree') }}
            <span v-if="!RawTree">EOF</span>
            <ul v-if="RawTree">
              <Tree :item="(RawTree as Tree).children[0]" />
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="inner-wrapper table-wrapper" :data-title="t('table.title')">
        <div class="scroll-wrapper">
          <TruthTable
            v-if="errorMsg == '' && inputValue.replace(/\s/g, '') != ''"
            :usedVaribles="usedVaribles"
            :subsequencesResult="subsequencesResult"
            :showIntermediateProcesses="store.$state.showIntermediateProcesses"
            :inputValue="inputValue"
            :finalResult="finalResult"
          />
        </div>
      </div>
    </div>
    <FloatInputBtnGroup :show="isInputFocused" @input="onInputBtnClick" />
  </div>
</template>

<style scoped>
.wrapper {
  @apply mx-2 sm:mx-4 my-4 grid grid-cols-12 gap-4;
}

.wrapper > .left {
  @apply col-span-12;
  @apply flex flex-col gap-y-4;
}

.wrapper > .right {
  @apply col-span-12;
}

.wrapper.horizontal > .left {
  @apply lg:col-span-8;
}

.wrapper.horizontal > .right {
  @apply lg:col-span-4;
}

.wrapper .main-input {
  @apply outline-transparent;
  @apply text-xl;
  @apply w-full px-5 md:px-20 py-3 tracking-wider;
  @apply bg-purple-200 dark:bg-gray-800 rounded-xl;
  @apply transition;
  @apply shadow-lg shadow-purple-500/10 dark:shadow-dark-900/20;
}

.wrapper .main-input:focus {
  @apply shadow-xl shadow-purple-500/10 dark:shadow-dark-900/20;
}

.wrapper .main-input::-webkit-input-placeholder {
  @apply select-none;
  @apply text-purple-600/50 dark:text-gray-50/50;
}

.inner-wrapper {
  @apply relative;
  @apply w-full px-5 md:px-20 py-3 tracking-wider;
  @apply bg-purple-200 dark:bg-gray-800 rounded-xl;
  @apply transition;
  @apply pt-10;
  @apply shadow-lg shadow-purple-500/10 dark:shadow-dark-900/20;
}

.inner-wrapper::after {
  content: attr(data-title);
  @apply px-2 py-0.5;
  @apply absolute top-0 left-0 rounded-br-md rounded-tl-xl;
  @apply bg-purple-300 dark:bg-gray-900 dark:opacity-90;
}

.error-wrapper {
  @apply text-red-600 dark:text-warm-gray-200;
  @apply bg-red-200 dark:bg-warm-gray-800;
  @apply shadow-red-500/10 dark:shadow-warm-gray-900/20;
}

.error-wrapper::after {
  @apply bg-red-300 dark:bg-gray-900;
}

.scroll-wrapper {
  @apply overflow-auto max-h-180;
}

.used-subsequences,
.used-variables {
  @apply flex gap-x-2 mb-1 flex-wrap gap-y-1;
}

.used-subsequences span,
.used-variables span {
  @apply bg-purple-300 dark:bg-dark-900 px-3 rounded-lg;
}

.table-wrapper {
  @apply px-4;
}
.table-wrapper .scroll-wrapper {
  @apply max-h-200 rounded-lg;
}
</style>
