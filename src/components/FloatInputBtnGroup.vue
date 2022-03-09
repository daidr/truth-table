<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { Icon } from '@iconify/vue';

const emits = defineEmits(['input'])

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
})

const BtnGroupEl = ref();

const onBtnClick = (char: string) => {
    emits("input", char)
}

const isMouseIn = ref(false);

const onMouseEnter = () => {
    isMouseIn.value = true;
}
const onMouseLeave = () => {
    isMouseIn.value = false;
}

let isDrop = ref(false);
let disX = 0;
let disY = 0;

const checkXY = (x: number, y: number) => {
    let w = window.innerWidth;
    let h = window.innerHeight;
    x = x < 30 ? 30 : x;
    x = x > w - BtnGroupEl.value.clientWidth - 30 ? w - BtnGroupEl.value.clientWidth - 30 : x;
    y = y < 30 ? 30 : y;
    y = y > h - BtnGroupEl.value.clientHeight - 30 ? h - BtnGroupEl.value.clientHeight - 30 : y;
    return { x, y };
}


const onMouseDown = (e: PointerEvent) => {
    isDrop.value = true;
    disX = e.pageX - BtnGroupEl.value.offsetLeft
    disY = e.pageY - BtnGroupEl.value.offsetTop
}

const onMouseMove = (e: PointerEvent) => {
    if (isDrop.value) {

        let { x, y } = checkXY(e.pageX - disX, e.pageY - disY);

        BtnGroupEl.value.style.left = x + 'px'
        BtnGroupEl.value.style.top = y + 'px'
    }
}

const onMouseUp = () => {
    if (isDrop.value) {
        isDrop.value = false;
        onBtnClick('');
    }
}

onMounted(() => {
    BtnGroupEl.value.style.top = window.innerHeight / 4 + 'px'
    BtnGroupEl.value.style.left = window.innerWidth / 4 + 'px'
    document.addEventListener("pointermove", onMouseMove)
    document.addEventListener("pointerup", onMouseUp)
})

onUnmounted(() => {
    document.removeEventListener("pointermove", onMouseMove)
    document.removeEventListener("pointerup", onMouseUp)
})

watch(() => props.show, () => {
    let { x, y } = checkXY(BtnGroupEl.value.offsetLeft, BtnGroupEl.value.offsetTop);
    BtnGroupEl.value.style.left = x + 'px';
    BtnGroupEl.value.style.top = y + 'px';
})


</script>

<template>
    <div
        ref="BtnGroupEl"
        class="btn-group"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        :class="{ show: isMouseIn || show || isDrop }"
    >
        <div class="btn" @click="onBtnClick('¬')">¬</div>
        <div class="btn" @click="onBtnClick('⋀')">⋀</div>
        <div class="btn" @click="onBtnClick('⋁')">⋁</div>
        <div class="btn" @click="onBtnClick('→')">→</div>
        <div class="btn" @click="onBtnClick('⇔')">⇔</div>
        <div class="btn" @click="onBtnClick('(')">(</div>
        <div class="btn" @click="onBtnClick(')')">)</div>
        <div class="move-handle" @pointerdown="onMouseDown">
            <Icon icon="uil:draggabledots" />
        </div>
    </div>
</template>

<style scoped>
.btn-group {
    @apply opacity-0 pointer-events-none z-99;
    @apply touch-none;
    @apply static md:(fixed bottom-auto left-1/4 right-auto);
    @apply p-2 gap-x-2;
    @apply md:rounded-xl;
    @apply flex flex-row justify-around items-center select-none;
    @apply bg-purple-200 dark:bg-gray-800;
    @apply shadow-lg shadow-purple-500/10 dark:shadow-dark-900/20;

    transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1),
        max-height 0.15s cubic-bezier(0.4, 0, 0.2, 1),
        padding 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-group {
    @apply <md:(max-h-0 p-0);
}

.btn-group.show {
    @apply opacity-100 pointer-events-auto;
    @apply <md:(max-h-15 p-2);
}

.btn {
    @apply flex flex-row w-auto flex-shrink-0 flex-grow md:w-15 h-10 transition transform-gpu;
    @apply rounded-lg;
    @apply items-center justify-center cursor-pointer;
    @apply bg-purple-300 bg-opacity-20 dark:bg-gray-500/50;
}

.btn:hover {
    @apply md:bg-opacity-100;
}

.btn:active {
    @apply bg-opacity-100 scale-90 dark:bg-gray-500;
}

.move-handle {
    @apply cursor-move hidden md:flex;
    @apply w-5 h-10 items-center justify-center;
}
</style>