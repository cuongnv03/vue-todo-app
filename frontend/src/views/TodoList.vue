<script setup>
import MainLayout from '../layouts/MainLayout.vue'
import Card from 'primevue/card'
</script>

<template>
    <MainLayout>
        <Card>
            <template #title>
                Todo List
            </template>

            <template #content>
                Todo list will be implemented here.
            </template>
        </Card>
    </MainLayout>
</template>