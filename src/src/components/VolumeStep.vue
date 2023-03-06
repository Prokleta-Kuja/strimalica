<script setup lang="ts">
import { useRadioPlayer } from '@/stores/RadioPlayer';
import { ref } from 'vue';
const props = defineProps<{
    val: number
}>()

const el = ref<HTMLButtonElement | null>(null);
const radioPlayer = useRadioPlayer();
const changeVolume = () => {
    radioPlayer.changeVolume(props.val);
    el.value?.blur();
};
</script>
<template>
    <button ref="el" type="button" @click="changeVolume" class="btn"
        :class="[radioPlayer.currentVolume === props.val ? 'btn-success' : 'btn-warning']">
        {{ props.val }}%
    </button>
</template>