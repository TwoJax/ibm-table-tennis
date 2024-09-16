<template>
  <cv-tile>
    <div class="flex items-center justify-between">
      <h2 class="flex items-end space-x-2">
        <span>Table 1</span>

        <cv-link
          to="/table/1"
          :icon="ScreenMap20"
          class="mb-1.5 -scale-x-100 opacity-75 hover:opacity-100"
        />
      </h2>

      <cv-tag
        v-if="game"
        kind="green"
        label="Live"
      />
    </div>

    <div class="flex flex-col my-8 gap-y-1">
      <h3 class="text-gray-500 py-1">No match started</h3>
    </div>

    <div class="flex items-center justify-between">
      <cv-button
        kind="tertiary"
        :icon="ViewNext20"
      >
        Next Match
      </cv-button>
    </div>
  </cv-tile>
</template>

<script setup lang="ts">
  import ScreenMap20 from '@carbon/icons-vue/es/screen-map/20'
  import ViewNext20 from '@carbon/icons-vue/es/view-next/20'

  interface Props {
    tableNumber: number
    game?: object
  }

  defineProps<Props>()
</script>
