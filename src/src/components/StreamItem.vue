<script setup lang="ts">
import { useRadioPlayer, type IRadioStream } from '@/stores/RadioPlayer';
import { ref } from 'vue';
const props = defineProps<{
    stream: IRadioStream
}>()

const el = ref<HTMLButtonElement | null>(null);
const radioPlayer = useRadioPlayer();
const changeStream = () => {
    radioPlayer.changeStation(props.stream);
    el.value?.blur();
};
</script>
<template>
    <button ref="el" type="button" @click="changeStream" class="text-center list-group-item list-group-item-action"
        :class="[radioPlayer.currentStream.id === props.stream.id ? 'list-group-item-success' : 'list-group-item-dark']">
        {{ props.stream.title }}
    </button>
</template>