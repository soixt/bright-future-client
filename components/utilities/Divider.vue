<template>
    <div class="divider" :class="!$slots.default ? 'is-empty' : ''">
        <slot></slot>
    </div>
</template>

<script>
export default {
    
}
</script>