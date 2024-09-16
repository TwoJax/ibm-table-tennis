<template>
  <section class="bg-[#002ea1] text-white py-[100px] px-[150px]">
    <div class="flex items-start justify-between mb-32">
      <h1 class="text-6xl">Calling the Shots</h1>
      <img
        src="@/assets/ibm-logo-black-and-white.png"
        class="mt-4 h-16 w-auto"
      />
    </div>

    <div class="mb-16">
      <h2 class="font-bold text-5xl mb-[24px]">Next up</h2>
      <p class="text-5xl italic">Please check in with IBM staff</p>
    </div>

    <div class="flex flex-col space-y-4 mt-[70px]">
      <h3
        v-for="(player, index) in currentGame[0]?.players"
        :key="index"
        class="font-light text-6xl text-[#ffdb50]"
      >
        {{ player }}.
      </h3>
    </div>
  </section>

  <section class="py-[100px] px-[150px]">
    <h2 class="font-bold text-5xl text-[#002ea1] mb-8">On deck</h2>

    <div class="flex flex-col space-y-4">
      <h3
        v-for="player in onDeck"
        :key="player.id"
        class="font-light text-6xl"
      >
        {{ player.first_name }} {{ player.last_name[0] }}.
      </h3>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useTableTennisRegistrationStore } from '@/stores/table_tennis_registration'

  const store = useTableTennisRegistrationStore()
  const $route = useRoute()

  const tableNumber = $route.params.number

  const currentGame = computed(() =>
    store.games!.filter((game) => game.table_number == tableNumber)
  )
  const onDeck = store[`table${tableNumber}Queue`]

  onMounted(() => {
    setInterval(() => {
      store.refreshData()
    }, 30_000)
  })
</script>

<style scoped lang="scss">
  html,
  body {
    background-color: #e1f7ff !important;
    height: 100%;
  }

  body {
    background-image: url('@/assets/tennis-ball-background.svg');
    background-position: bottom right;
    background-repeat: no-repeat;
  }
</style>
