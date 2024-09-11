<template>
  <cv-modal :visible="visible" @after-modal-hidden="() => $emit('close-modal')" @primary-click="onPrimaryClick"
    @secondary-click="() => $emit('close-modal')">
    <template #title>Sign in player</template>
    <template #primary-button>Add Player</template>
    <template #secondary-button>Cancel</template>

    <template #content>
      <cv-form>
        <div class="flex justify-between items-center space-x-4">
          <cv-text-input label="First name" />
          <cv-text-input label="Last name" />
        </div>
      </cv-form>
    </template>
  </cv-modal>
</template>

<script setup lang="ts">
defineEmits(['close-modal'])

interface Props {
  visible: boolean
}

defineProps<Props>()

const onPrimaryClick = () => {
  console.log('Add player!')
}
</script>

<style scoped>
.cv-text-input:first {
  margin-bottom: 2rem;
}
</style>
