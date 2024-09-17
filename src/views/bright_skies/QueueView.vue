<template>
  <cv-grid>
    <cv-row class="mb-6">
      <cv-column>
        <cv-tile>
          <div class="flex items-center justify-between">
            <h2 class="flex items-end space-x-2">
              <span>Currently Called Wristbands</span>

              <cv-link
                to="/bright_skies/queue"
                :icon="ScreenMap20"
                class="mb-1.5 -scale-x-100 opacity-75 hover:opacity-100"
              />
            </h2>
          </div>

          <div class="flex items-end justify-between">
            <div class="flex flex-col mt-8 gap-y-1 w-36">
              <span
                v-if="store.currentlyCalledRegistrations?.length"
                class="font-semibold text-gray-600"
              >
                Called at {{ userFriendlyTime(store.currentlyCalledRegistrations[0].called_at) }}
              </span>

              <div class="grid grid-cols-1">
                <div
                  v-if="store.currentlyCalledRegistrations?.length"
                  class="divide-solid divide-y divide-gray-200"
                >
                  <h3
                    v-for="registration in store.currentlyCalledRegistrations"
                    :key="registration.id"
                    class="py-1"
                  >
                    {{ registration.wristband_id }}
                  </h3>
                </div>

                <div
                  v-else
                  class="divide-solid divide-y divide-gray-200 text-gray-500"
                >
                  <h3 class="py-1">-</h3>
                  <h3 class="py-1">-</h3>
                </div>
              </div>
            </div>

            <cv-button
              kind="tertiary"
              :icon="ViewNext20"
              class="mb-10"
              @click="store.nextGroup()"
            >
              Next Group
            </cv-button>
          </div>
        </cv-tile>
      </cv-column>
    </cv-row>

    <cv-row>
      <cv-column>
        <cv-tabs
          :container="true"
          aria-label="navigation tab label"
        >
          <cv-tab
            id="queue"
            label="On Deck"
            :selected="selectedId === 'queue'"
          >
            <cv-tile class="!flex !items-center !justify-end !min-h-0 !p-0">
              <cv-button
                kind="primary"
                :icon="UserFollow20"
                @click="isModalVisible = true"
              >
                Sign in guest
              </cv-button>
            </cv-tile>
            <cv-data-table>
              <template #headings>
                <cv-data-table-heading
                  heading="Wristband"
                  name="wristband"
                />

                <cv-data-table-heading
                  heading="Signed in at"
                  name="created_at"
                />
              </template>

              <template #data>
                <cv-data-table-row v-show="store.uncalledRegistrations?.length === 0">
                  <cv-data-table-cell colspan="2">
                    <div class="flex items-center justify-center italic">
                      There's nothing in the queue. Sign in a guest.
                    </div>
                  </cv-data-table-cell>
                </cv-data-table-row>

                <cv-data-table-row
                  v-for="row in store.uncalledRegistrations"
                  :key="row.id"
                  :value="row.wristband_id"
                >
                  <cv-data-table-cell>{{ row.wristband_id }}</cv-data-table-cell>
                  <cv-data-table-cell>{{ userFriendlyDate(row.created_at) }}</cv-data-table-cell>
                </cv-data-table-row>
              </template>
            </cv-data-table>
          </cv-tab>

          <cv-tab
            id="previously-called"
            label="Previously Called"
            :selected="selectedId === 'previously-called'"
          >
            <cv-data-table>
              <template #actions></template>
              <template #headings>
                <cv-data-table-heading
                  heading="Wristband"
                  name="wristband"
                />

                <cv-data-table-heading
                  heading="Signed in at"
                  name="created_at"
                />

                <cv-data-table-heading
                  heading="Called at"
                  name="called_at"
                />
              </template>

              <template #data>
                <cv-data-table-row v-show="store.previousWithoutCurrent?.length === 0">
                  <cv-data-table-cell colspan="3">
                    <div class="flex items-center justify-center italic">
                      Guests will show here after being called.
                    </div>
                  </cv-data-table-cell>
                </cv-data-table-row>

                <cv-data-table-row
                  v-for="row in store.previousWithoutCurrent"
                  :key="row.id"
                  :value="row.wristband_id"
                >
                  <cv-data-table-cell>{{ row.wristband_id }}</cv-data-table-cell>
                  <cv-data-table-cell>{{ userFriendlyDate(row.created_at) }}</cv-data-table-cell>
                  <cv-data-table-cell>{{ userFriendlyDate(row.called_at) }}</cv-data-table-cell>
                </cv-data-table-row>
              </template>
            </cv-data-table>
          </cv-tab>
        </cv-tabs>
      </cv-column>
    </cv-row>
  </cv-grid>

  <registration-modal
    :visible="isModalVisible"
    @close-modal="isModalVisible = false"
  />
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { format } from 'date-fns'
  import { Timestamp } from 'firebase/firestore'

  import { useBrightSkiesRegistrationStore } from '@/stores/bright_skies_registrations'
  import RegistrationModal from '@/components/bright_skies/RegistrationModal.vue'

  import ScreenMap20 from '@carbon/icons-vue/es/screen-map/20'
  import UserFollow20 from '@carbon/icons-vue/es/user--follow/20'
  import ViewNext20 from '@carbon/icons-vue/es/view-next/20'

  const store = useBrightSkiesRegistrationStore()

  const isModalVisible = ref(false)
  const selectedId = ref('queue')

  const userFriendlyTime = (date: object) => {
    const timestamp = new Timestamp(date['seconds'], date['nanoseconds']).toDate()
    return format(timestamp, 'p')
  }

  const userFriendlyDate = (date: object) => {
    const timestamp = new Timestamp(date['seconds'], date['nanoseconds']).toDate()
    return format(timestamp, 'P h:mm aaaa')
  }

  onMounted(() => {
    store.initializeState()
  })
</script>

<style scoped lang="scss">
  .bx--data-table-container {
    padding-top: 0 !important;
  }
</style>
