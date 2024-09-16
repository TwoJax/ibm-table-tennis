<template>
  <cv-modal
    :visible="visible"
    @after-modal-hidden="onAfterModalHidden"
    @primary-click="onPrimaryClick"
    @secondary-click="() => $emit('close-modal')"
  >
    <template #title>Sign in player</template>
    <template #primary-button>Add Player</template>
    <template #secondary-button>Cancel</template>

    <template #content>
      <cv-form>
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-1">
            <cv-text-input
              v-model="firstName"
              label="First name"
              :invalid-message="v.firstName?.$errors[0]?.$message"
            />
          </div>

          <div class="col-span-1">
            <cv-text-input
              v-model="lastName"
              label="Last name"
              :invalid-message="v.lastName?.$errors[0]?.$message"
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

  import { useTableTennisRegistrationStore } from '@/stores/table_tennis_registration'

  const emit = defineEmits(['close-modal'])

  interface Props {
    visible: boolean
  }

  defineProps<Props>()

  const store = useTableTennisRegistrationStore()

  const firstName = ref('')
  const lastName = ref('')

  const rules = computed(() => {
    return {
      firstName: { minLength, required },
      lastName: { minLength, required }
    }
  })

  const v = useVuelidate(rules, { firstName, lastName })

  const onAfterModalHidden = () => {
    firstName.value = ''
    lastName.value = ''
    v.value.$reset()

    emit('close-modal')
  }

  const onPrimaryClick = async () => {
    const result = await v.value.$validate()

    if (!result) {
      return
    } else {
      store.addPlayer(firstName.value, lastName.value)
      emit('close-modal')
    }
  }
</script>

<style scoped>
  .cv-text-input:first {
    margin-bottom: 2rem;
  }
</style>
