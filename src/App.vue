<template>
  <nav-bar
    v-show="!$route.meta.hideNavbar"
    :player-modal-visible="playerModalVisible"
    @open-modal="playerModalVisible = true"
  />

  <router-view @open-model="playerModalVisible = true" />

  <player-form-modal
    :visible="playerModalVisible"
    @close-modal="playerModalVisible = false"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import NavBar from '@/components/ui/NavBar.vue'
  import PlayerFormModal from '@/components/players/FormModal.vue'

  const playerModalVisible = ref(false)
</script>

<style scoped></style>
