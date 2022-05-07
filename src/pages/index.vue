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
import {
  pushHistory,
  removeAllHistory,
  removeHistory,
  historyArray,
} from '../utils/history';
import FloatInputBtnGroup from '../components/FloatInputBtnGroup.vue';
import { Icon } from '@iconify/vue';

// i18n
const { t } = useI18n();

// 全局状态储存
const store = useStore();

// 输入框对象
const MainInputEl = ref();

// 输入框当前光标位置
let currentInputPos = 0;

// 输入框内容（双向绑定）
const inputValue = ref('');

// 原始的Token列表
const RawTokens = ref([]);

// Parser树定义
interface Tree {
  getText: Function;
  children?: Tree[];
}

// Parser树
const RawTree = ref(false) as Ref<Boolean | Tree>;

// 是否处于调试模式
const inDebugMode = computed(() => store.$state.inDebugMode);

// 错误信息
const errorMsg = ref('');

// 当错误信息为 handled error 时，可以通过这个变量给予用户更多的提示（支持i18n）
const errorMsgData = ref({ text: '', params: {} });

// 用于将用户输入的一些替代符号和不合法空白符替换为正常的符号
const handleInputNotations = (value: string): string => {
  return value
    .replace(/[!！┐￢]/g, '¬')
    .replace(/[》>.。]/g, '→')
    .replace(/[【{\[（]/g, '(')
    .replace(/[】}\]）]/g, ')')
    .replace(/[=↔+]/g, '⇔')
    .replace(/[&^∧]/g, '⋀')
    .replace(/[|∨\\、]/g, '⋁')
    .replace(/\s{2,}/g, ' ')
    .replace(/[^A-Za-z0-9 ¬→⇔⋀⋁()]/g, '')
    .trimStart();
};

// 最终生成的执行函数（字符串形式）
let finalFunctionStr = '';
// 最终生成的执行函数
let finalFunction: Function;

// 最终的真值表原始数据
const finalResult = reactive([]);

// 使用的变元列表
const usedVaribles = ref([]);
// 中间步骤（子序列）
const usedSubsequences = reactive([]);
// 括号子序列单独考虑（不算入中间步骤）
let usedParSubsequences = [];

// 中间步骤的结果列表
const subsequencesResult = ref([]);

// 增加中间步骤
const addSubsequences = ctx => {
  usedSubsequences.push(ctx.getText());
};

// 自定义的parser错误处理程序
class CustomErrorListener extends ErrorListener {
  constructor() {
    super();
  }

  // 重载语法错误处理程序
  syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
    errorMsg.value = 'handled error';
    errorMsgData.value = {
      text: 'parser.error.syntax',
      params: { column, msg },
    };
  }
}
const errorListener = new CustomErrorListener();

// 生成真值表并进行相关处理的函数
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
    subsequencesResult.value = keys;
  }

  // 推入历史记录
  if (!errorMsg.value) {
    pushHistory(handleInputNotations(inputValue.value).trim());
  }

  // 计算析取/合取范式
  calcNormalForm();
};

// parser树所使用的listener
class VariableCount extends LogicListener {
  constructor() {
    super();
  }

  // 开始分析逻辑表达式时执行，初始化变量
  enterProg(ctx) {
    usedVaribles.value = [];
    usedParSubsequences = [];
    subsequencesResult.value = [];
    RawTree.value = false;
    finalResult.splice(0);
    usedSubsequences.splice(0);
    finalFunctionStr = `let data=values;\n`;
  }

  // 完成分析时执行，进行收尾操作，并计算真值表
  exitProg(ctx) {
    // 若输入与结果不一致，说明逻辑表达式不完整
    if (ctx.getText() !== inputValue.value.replace(/\s/g, '')) {
      if (!errorMsg.value) {
        errorMsg.value = 'handled error';
        errorMsgData.value = { text: 'parser.error.notvaild', params: {} };
      }
      return;
    }

    // 根据函数字符串生成可直接调用的函数
    finalFunction = new Function('values', finalFunctionStr);

    // 计算真值表
    calcTruthTable();
  }

  // 完成括号匹配时执行
  exitPar(ctx) {
    // 子序列存在，直接跳过
    if (usedParSubsequences.includes(ctx.getText())) {
      return;
    }

    // 推入括号子序列
    usedParSubsequences.push(ctx.getText());

    // 追加计算函数
    finalFunctionStr += `data["${ctx.getText()}"] = data["${ctx
      .expr()
      .getText()}"];\n`;
  }

  // 完成析取时执行
  exitDisjunction(ctx) {
    // 子序列存在，直接跳过
    if (usedSubsequences.includes(ctx.getText())) {
      return;
    }

    // 推入子序列
    addSubsequences(ctx);

    // 追加计算函数
    finalFunctionStr += `data["${ctx.getText()}"] = data["${ctx
      .expr(0)
      .getText()}"] || data["${ctx.expr(1).getText()}"];\n`;
  }

  // 完成单个变量解析时执行
  exitVariable(ctx) {
    // 推入变量并去重
    usedVaribles.value = [...new Set([...usedVaribles.value, ctx.getText()])];
  }

  // 完成取反时执行
  exitReverse(ctx) {
    // 子序列存在，直接跳过
    if (usedSubsequences.includes(ctx.getText())) {
      return;
    }

    // 推入子序列
    addSubsequences(ctx);

    // 追加计算函数
    finalFunctionStr += `data["${ctx.getText()}"] = Number(!data["${ctx
      .expr(0)
      .getText()}"]);\n`;
  }

  // 完成等值于时执行
  exitEquivalence(ctx) {
    // 子序列存在，直接跳过
    if (usedSubsequences.includes(ctx.getText())) {
      return;
    }

    // 推入子序列
    addSubsequences(ctx);

    // 追加计算函数
    finalFunctionStr += `data["${ctx.getText()}"] = Number(data["${ctx
      .expr(0)
      .getText()}"] == data["${ctx.expr(1).getText()}"]);\n`;
  }

  // 完成合取时执行
  exitConjunction(ctx) {
    // 子序列存在，直接跳过
    if (usedSubsequences.includes(ctx.getText())) {
      return;
    }

    // 推入子序列
    addSubsequences(ctx);

    // 追加计算函数
    finalFunctionStr += `data["${ctx.getText()}"] = data["${ctx
      .expr(0)
      .getText()}"] && data["${ctx.expr(1).getText()}"];\n`;
  }

  // 完成蕴含时执行
  exitImplication(ctx) {
    // 子序列存在，直接跳过
    if (usedSubsequences.includes(ctx.getText())) {
      return;
    }

    // 推入子序列
    addSubsequences(ctx);

    // 追加计算函数
    finalFunctionStr += `data["${ctx.getText()}"] = Number(data["${ctx
      .expr(0)
      .getText()}"] == 0 ? 1: data["${ctx.expr(1).getText()}"]);\n`;
  }
}

const variableCount = new VariableCount();

// 监听输入框值的变化，实时执行指令
watch(
  () => inputValue.value,
  (oldVal, newVal) => {
    if (oldVal != newVal) {
      errorMsg.value = '';
      try {
        // 获取输入框指针位置
        let pos = getCursorPosition(MainInputEl.value);

        // 过滤输入框内容
        inputValue.value = handleInputNotations(inputValue.value);

        // 保存输入框指针位置
        nextTick(() => {
          setCursorPosition(MainInputEl.value, pos);
        });

        const chars = new antlr4.InputStream(
          inputValue.value.replace(/\s/g, ''),
        );
        // 词法分析
        const lexer = new LogicLexer(chars);
        const tokens = new antlr4.CommonTokenStream(lexer);
        RawTokens.value = tokens.tokens;

        // 语法分析
        const parser = new LogicParser(tokens);

        // 自定义错误处理程序
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

// 输入框是否聚焦
const isInputFocused = ref(false);

// 输入框失去焦点事件
const handleBlur = () => {
  currentInputPos = getCursorPosition(MainInputEl.value);
  isInputFocused.value = false;
};

// 输入框获得焦点事件
const handleFocus = () => {
  isInputFocused.value = true;
};

// 特殊符号悬浮窗按钮被按下
const onInputBtnClick = (char: string) => {
  inputValue.value =
    inputValue.value.slice(0, currentInputPos) +
    char +
    inputValue.value.slice(currentInputPos);
  setTimeout(() => {
    MainInputEl.value.focus();
    setCursorPosition(MainInputEl.value, currentInputPos + 1);
  }, 10);
};

const DisjunctiveNormalForm = ref([]);
const ConjunctiveNormalForm = ref([]);

const calcNormalForm = () => {
  DisjunctiveNormalForm.value = [];
  let input = inputValue.value.replace(/\s/g, '');
  let temp = [];
  let temp2 = [];
  for (let i = 0; i < finalResult.length; i++) {
    if (finalResult[i]['values'][input] === 1) {
      temp.push(i.toString(2).padStart(usedVaribles.value.length, '0'));
    } else {
      temp2.push(i.toString(2).padStart(usedVaribles.value.length, '0'));
    }
  }
  DisjunctiveNormalForm.value = temp;
  ConjunctiveNormalForm.value = temp2;
};
</script>

<template>
  <div class="wrapper" :class="{ horizontal: store.$state.layoutHorizontal }">
    <div class="left">
      <div class="main-input-wrapper">
        <input
          ref="MainInputEl"
          v-model="inputValue"
          class="main-input"
          :placeholder="t('input.placeholder')"
          @blur="handleBlur"
          @focus="handleFocus"
        />
        <FloatInputBtnGroup :show="isInputFocused" @input="onInputBtnClick" />
      </div>
      <div
        v-if="errorMsg != '' && inputValue.replace(/\s/g, '') != ''"
        class="inner-wrapper error-wrapper"
        :data-title="t('parser.error.title')"
      >
        <p v-if="errorMsg != 'handled error'">{{ errorMsg }}</p>
        <p v-else>{{ t(errorMsgData.text, errorMsgData.params) }}</p>
      </div>
      <div
        v-if="errorMsg == '' && inputValue.replace(/\s/g, '') != ''"
        class="inner-wrapper property-wrapper"
        :data-title="t('property.title')"
      >
        <div class="item">
          <p class="label">
            {{ t('property.principal_disjunctive_normal_form') }}
          </p>
          <div v-if="DisjunctiveNormalForm.length != 0" class="content">
            <template
              v-for="(item, index) of DisjunctiveNormalForm"
              :key="item"
            >
              <span>
                <span class="content-tag">
                  <span>m</span>
                  <sub>{{ item }}</sub>
                </span>
                <span class="px-1">{{
                  index < DisjunctiveNormalForm.length - 1 ? '⋁' : ''
                }}</span>
              </span>
            </template>
          </div>
          <div v-else class="content">
            0 ({{ t('property.contradictory_formula') }})
          </div>
        </div>
        <div class="item">
          <p class="label">
            {{ t('property.principal_conjunctive_normal_form') }}
          </p>
          <div v-if="ConjunctiveNormalForm.length != 0" class="content">
            <template
              v-for="(item, index) of ConjunctiveNormalForm"
              :key="item"
            >
              <span>
                <span class="content-tag">
                  <span>M</span>
                  <sub>{{ item }}</sub>
                </span>
                <span class="px-1">{{
                  index < ConjunctiveNormalForm.length - 1 ? '⋀' : ''
                }}</span>
              </span>
            </template>
          </div>
          <div v-else class="content">1 ({{ t('property.tautology') }})</div>
        </div>
      </div>
      <div
        v-if="inDebugMode"
        class="inner-wrapper"
        :data-title="t('lexer.title')"
      >
        <div class="scroll-wrapper text-sm">
          <code
            v-for="(rawToken, index) of RawTokens"
            :key="index"
            class="whitespace-pre"
          >
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
      <div
        v-if="inDebugMode"
        class="inner-wrapper"
        :data-title="t('parser.title')"
      >
        <div class="scroll-wrapper">
          <div class="used-variables">
            {{ t('parser.used-var') }}
            <span v-if="usedVaribles.length == 0">
              {{ t('parser.used-var.empty') }}
            </span>
            <span v-for="variable of usedVaribles" :key="variable">
              {{ variable }}
            </span>
          </div>
          <div class="used-subsequences">
            {{ t('parser.used-subsequence') }}
            <span v-if="usedSubsequences.length == 0">
              {{ t('parser.used-var.empty') }}
            </span>
            <span v-for="subsequence of usedSubsequences" :key="subsequence">
              {{ subsequence }}
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
      <div
        v-if="historyArray.length != 0"
        class="inner-wrapper history-wrapper"
        :data-title="t('history.title')"
      >
        <div class="remove-all-history-btn" @click="removeAllHistory">
          t('history.clear')
        </div>
        <div
          class="history-item"
          v-for="(history, index) of historyArray"
          :key="history"
        >
          <div @click="inputValue = history" class="history-item-content">
            {{ history }}
          </div>
          <div class="history-remove-btn" @click="removeHistory(index)">
            <Icon icon="uil:times" />
          </div>
        </div>
      </div>
    </div>
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
  @apply flex flex-col gap-y-4;
}

.wrapper.horizontal > .left {
  @apply lg:col-span-8;
}

.wrapper.horizontal > .right {
  @apply lg:col-span-4;
}

.main-input-wrapper {
  @apply bg-purple-200 dark:bg-gray-800 rounded-xl overflow-hidden;
  @apply transition relative;
  @apply shadow-lg shadow-purple-500/10 dark:shadow-dark-900/20;
}

.main-input-wrapper:focus-within {
  @apply shadow-xl shadow-purple-500/10 dark:shadow-dark-900/20;
}

.main-input-wrapper:focus-within::after {
  @apply opacity-100;
}

.main-input-wrapper::after {
  content: '';
  @apply absolute top-0 left-0 right-0 bottom-0 rounded-xl;
  @apply border-2 border-transparent border-white border-solid pointer-events-none;
  @apply transition opacity-0;
}

.main-input {
  outline: none !important;
  @apply text-xl bg-transparent;
  @apply w-full px-5 md:px-20 py-3 tracking-wider;
}

.main-input::-webkit-input-placeholder {
  @apply select-none <sm:text-base;
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
  @apply bg-purple-300 dark:bg-gray-900 px-3 rounded-lg;
}

.property-wrapper {
  @apply flex flex-col gap-y-4;
  @apply pb-5 md:pb-8;
}

.property-wrapper .item .label {
  @apply select-none mb-1 text-lg;
}

.property-wrapper .item .content {
  @apply flex flex-wrap gap-y-1 ml-4;
}

.property-wrapper .item .content .content-tag {
  @apply bg-purple-300 dark:bg-gray-900 py-0.5 px-3 rounded-lg;
}

.table-wrapper {
  @apply px-3 md:px-4;
}
.table-wrapper .scroll-wrapper {
  @apply max-h-200 rounded-lg;
}

.history-wrapper {
  @apply px-3 md:px-4 relative;
  @apply flex flex-col gap-y-2;
}

.history-wrapper .remove-all-history-btn {
  @apply absolute top-0 right-0;
  @apply px-2 py-0.5;
  @apply rounded-bl-md rounded-tr-xl select-none;
  @apply bg-purple-300 dark:bg-gray-900 dark:opacity-90;
  @apply cursor-pointer;
  @apply transition;
}

.history-wrapper .remove-all-history-btn:hover {
  @apply bg-purple-400/80 dark:bg-gray-600;
}

.history-wrapper .history-item {
  @apply flex gap-x-2;
}

.history-wrapper .history-remove-btn,
.history-wrapper .history-item-content {
  @apply px-2 py-1;
  @apply cursor-pointer;
  @apply transition transform-gpu;
  @apply rounded-lg select-none;
  @apply bg-purple-300/50 dark:bg-gray-900 dark:opacity-90;
}

.history-wrapper .history-item-content {
  @apply flex-grow;
}

.history-wrapper .history-remove-btn {
  @apply flex items-center justify-center;
}

.history-wrapper .history-remove-btn:hover,
.history-wrapper .history-item-content:hover {
  @apply bg-purple-300/80 dark:bg-gray-600;
}

.history-wrapper .history-remove-btn:active,
.history-wrapper .history-item-content:active {
  @apply scale-95;
}
</style>
