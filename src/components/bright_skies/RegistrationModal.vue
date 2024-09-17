<template>
  <cv-modal
    :visible="visible"
    @after-modal-hidden="onAfterModalHidden"
    @primary-click="onPrimaryClick"
    @secondary-click="() => $emit('close-modal')"
  >
    <template #title>Sign in guest</template>
    <template #primary-button>Add Guest</template>
    <template #secondary-button>Cancel</template>

    <template #content>
      <cv-form>
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-1">
            <cv-text-input
              v-model="wristbandId"
              label="Wristband ID"
              :invalid-message="v.wristbandId?.$errors[0]?.$message"
            />
          </div>
        </div>
      </cv-form>
    </template>
  </cv-modal>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { minLength, required } from '@vuelidate/validators'

  import { useBrightSkiesRegistrationStore } from '@/stores/bright_skies_registrations'

  const emit = defineEmits(['close-modal'])

  interface Props {
    visible: boolean
  }

  defineProps<Props>()

  const store = useBrightSkiesRegistrationStore()

  const wristbandId = ref('')

  const rules = computed(() => {
    return {
      wristbandId: { minLength, required }
    }
  })

  const v = useVuelidate(rules, { wristbandId })

  const onAfterModalHidden = () => {
    wristbandId.value = ''
    v.value.$reset()

    emit('close-modal')
  }

  const onPrimaryClick = async () => {
    const result = await v.value.$validate()

    if (!result) {
      return
    } else {
      store.addRegistration(wristbandId.value)
      emit('close-modal')
    }
  }
</script>
