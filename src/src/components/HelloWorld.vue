<script setup lang="ts">
import { useRadioPlayer } from '@/stores/RadioPlayer';

defineProps<{
  txt: string
}>()

const radioPlayer = useRadioPlayer();
radioPlayer.changeStation(radioPlayer.radioStreams[0])
</script>

<template>
  <button class="btn btn-primary" @click="radioPlayer.toggleRadio">{{ txt }}</button>
</template>
