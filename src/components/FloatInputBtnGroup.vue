<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
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
    let w = document.body.clientWidth;
    let h = document.body.clientHeight;
    x = x < 30 ? 30 : x;
    x = x > w - 420 ? w - 420 : x;
    y = y < 20 ? 20 : y;
    y = y > h - 30 ? h - 30 : y;
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
    isDrop.value = false;
    onBtnClick('');
}

onMounted(() => {
    BtnGroupEl.value.style.top = window.innerHeight / 2 + 'px'
    BtnGroupEl.value.style.left = window.innerWidth / 4 + 'px'
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
        @pointermove="onMouseMove"
        :class="{ show: isMouseIn || show || isDrop }"
    >
        <div class="btn" @click="onBtnClick('¬')">¬</div>
        <div class="btn" @click="onBtnClick('⋀')">⋀</div>
        <div class="btn" @click="onBtnClick('⋁')">⋁</div>
        <div class="btn" @click="onBtnClick('→')">→</div>
        <div class="btn" @click="onBtnClick('⇔')">⇔</div>
        <Icon
            icon="uil:draggabledots"
            class="cursor-move hidden md:block"
            @pointerdown="onMouseDown"
            @pointerup="onMouseUp"
        />
    </div>
</template>

<style scoped>
.btn-group {
    @apply opacity-0 pointer-events-none transition;
    @apply touch-none;
    @apply fixed bottom-0 left-0 right-0 md:(bottom-auto left-1/4 right-auto);
    @apply p-2 gap-x-2;
    @apply md:rounded-xl;
    @apply flex flex-row justify-around items-center select-none;
    @apply bg-purple-200 dark:bg-gray-800;
    @apply shadow-lg shadow-purple-500/10 dark:shadow-dark-900/20;
}

.btn-group.show {
    @apply opacity-100 pointer-events-auto;
}

@media screen and (max-width: 768px) {
    .btn-group {
        bottom: 0 !important;
        left: 0 !important;
        right: 0 !important;
        top: auto !important;
    }
}

.btn {
    @apply flex flex-row w-auto flex-grow md:w-15 h-10 transition;
    @apply rounded-lg;
    @apply items-center justify-center cursor-pointer;
    @apply bg-purple-300 bg-opacity-20;
    -webkit-tap-highlight-color: transparent;
}

.btn:hover {
    @apply md:bg-opacity-100;
}

.btn:active {
    @apply bg-opacity-100 scale-75;
}
</style>