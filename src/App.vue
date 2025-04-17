<script setup>
import AppHeader from './components/Header.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const hideHeaderOnRoutes = ['/Login', '/Register']
</script>

<template>
  <AppHeader v-if="!hideHeaderOnRoutes.includes(route.path)" />
  <router-view />
</template>

<style scoped></style>
