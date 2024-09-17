<template>
  <nav-bar
    v-show="!$route.meta.hideNavbar"
    :hide-button="$route.meta.hideButton"
    :player-modal-visible="playerModalVisible"
    :title="$route.meta.title"
    @open-modal="playerModalVisible = true"
  />

  <router-view />

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
