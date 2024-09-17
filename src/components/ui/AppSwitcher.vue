<template>
  <cv-header-panel
    ref="target"
    id="switcher-panel"
    :expanded="visible"
  >
    <cv-switcher>
      <cv-switcher-item>
        <cv-switcher-item-link
          to="/"
          :selected="isCurrentRoute('/')"
        >
          Calling the Shots
        </cv-switcher-item-link>
      </cv-switcher-item>

      <cv-switcher-item>
        <cv-switcher-item-link
          to="/bright_skies"
          :selected="isCurrentRoute('/bright_skies')"
        >
          Blue Skies
        </cv-switcher-item-link>
      </cv-switcher-item>
    </cv-switcher>
  </cv-header-panel>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { onClickOutside } from '@vueuse/core'

  const emit = defineEmits(['close'])
  const target = ref(null)

  interface Props {
    visible: boolean
  }

  withDefaults(defineProps<Props>(), {
    visible: false
  })

  onClickOutside(target, (event) => {
    if (event?.target?.closest('[aria-label="App switcher"]') === null) {
      emit('close')
    }
  })

  const route = useRoute()

  const isCurrentRoute = (checkPath: string): boolean => route.path === checkPath
</script>
