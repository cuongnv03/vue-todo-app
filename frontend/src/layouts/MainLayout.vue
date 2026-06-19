<script setup>
import Toast from 'primevue/toast'
</script>

<template>
    <Toast />

    <div class="layout">
        <header class="layout-header">
            <h1>
                ToDo App
            </h1>
        </header>

        <main class="layout-main">
            <slot />
        </main>
    </div>
</template>

<style scoped>
.layout {
    min-height: 100vh;
    padding: 24px;
    background: #f6f7fb;
}

.layout-header {
    max-width: 960px;
    margin: 0 auto 24px;
}

.layout-header h1 {
    margin: 0;
}

.layout-main {
    max-width: 960px;
    margin: 0 auto;
}
</style>