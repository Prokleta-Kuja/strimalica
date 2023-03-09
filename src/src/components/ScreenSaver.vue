<script setup lang="ts">
import { useRadioPlayer } from '@/stores/RadioPlayer';
import { ref } from 'vue';

const radio = useRadioPlayer();
const el = ref<HTMLElement | null>(null);

</script>
<template>
    <div ref="el" id="screensaver" v-show="radio.screenSaver.shown" :style="{ backgroundColor: radio.screenSaver.color }"
        @click="radio.toggleScreenSaver">
    </div>
</template>
<style>
#screensaver {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 2;
    transition: 3s background-color ease;
}
</style>