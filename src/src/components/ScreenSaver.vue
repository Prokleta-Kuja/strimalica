<script setup lang="ts">
import { useRadioPlayer } from '@/stores/RadioPlayer';
import { ref } from 'vue';

const radio = useRadioPlayer();
const el = ref<HTMLElement | null>(null);

</script>
<template>
    <div ref="el" id="screensaver" class="position-absolute top-0 start-0 w-100 h-100" v-show="radio.screenSaver.shown"
        :style="{ backgroundColor: radio.screenSaver.color }" @click="radio.toggleScreenSaver">
        <div id="screensaver-time" class="position-absolute top-50 start-50 translate-middle">{{ radio.screenSaver.time }}
        </div>
    </div>
</template>
<style>
#screensaver {
    z-index: 2;
    transition: 3s background-color ease;
}

#screensaver-time {
    color: black;
    font-size: 40vmin;
}
</style>