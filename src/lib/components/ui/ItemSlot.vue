<template>
    <div :class="['slot', isLocked ? 'is-locked' : '']">
        <div class="locked" v-if="isLocked">
            <v-icon color="white">mdi-lock-outline</v-icon>
        </div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        isLocked: {
            type: Boolean,
            default: false,
        }
    }
}
</script>
<style lang="scss" scoped>
.slot {
    position: relative;
    height: 64px;
    width: 64px;
    background-image: url('/images/icons/slot.png');
    display: flex;
    justify-content: center;
    align-items: center;
    &.is-locked {
        filter: grayscale(100);
    }
}
.locked {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>