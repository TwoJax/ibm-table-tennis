<template>
  <section class="bg-[#002ea1] text-white py-[100px] px-[150px]">
    <div class="flex items-start justify-between mb-32">
      <h1 class="text-6xl">Welcome to IBM Blue Skies</h1>
      <img
        src="@/assets/ibm-logo-black-and-white.png"
        class="mt-4 h-16 w-auto"
      />
    </div>

    <div class="mb-10">
      <h2 class="text-5xl mb-[24px]">Please make your way up to the elevator</h2>
    </div>

    <div>
      <div
        v-if="store.currentlyCalledRegistrations?.length"
        class="flex flex-col space-y-5"
      >
        <h3
          v-for="registration in store.currentlyCalledRegistrations"
          :key="registration.id"
          class="font-light text-6xl text-[#ffdb50]"
        >
          {{ registration.wristband_id }}
        </h3>
      </div>
    </div>
  </section>

  <section class="flex justify-between py-[100px] px-[150px]">
    <div>
      <h2 class="font-bold text-5xl text-[#002ea1] mb-8">On deck</h2>

      <div class="flex flex-col space-y-5">
        <h3
          v-for="registration in store.uncalledRegistrations"
          :key="registration.id"
          class="font-light text-6xl"
        >
          {{ registration.wristband_id }}
        </h3>
      </div>
    </div>

    <div>
      <h2 class="font-bold text-5xl text-[#002ea1] mb-8">Previously called</h2>

      <div class="flex flex-col space-y-5">
        <h3
          v-for="registration in store.previousWithoutCurrent"
          :key="registration.id"
          class="font-light text-6xl text-[#8d8d8d]"
        >
          {{ registration.wristband_id }}
        </h3>
      </div>
    </div>
  </section>

  <img
    src="@/assets/bright-skies-background.svg"
    class="absolute bottom-0 right-0"
  />
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useBrightSkiesRegistrationStore } from '@/stores/bright_skies_registrations'

  const store = useBrightSkiesRegistrationStore()

  onMounted(() => {
    store.initializeState()

    setInterval(() => {
      store.refreshData()
    }, 15_000)
  })
</script>

<style scoped lang="scss">
  html,
  body {
    background-color: #e1f7ff !important;
    height: 100%;
  }

  body {
    // background-image: url('@/assets/tennis-ball-background.svg');
    background-position: bottom right;
    background-repeat: no-repeat;
  }
</style>
