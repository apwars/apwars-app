<template>
    <div class="slot">
        <slot></slot>
    </div>
</template>
<style lang="scss" scoped>
.slot {
    height: 64px;
    width: 64px;
    background-image: url('/images/icons/slot.png');
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>