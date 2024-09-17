<template>
  <cv-grid>
    <cv-row class="mb-6">
      <cv-column>
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
              v-if="game1"
              kind="green"
              label="Live"
            />
          </div>

          <div class="flex flex-col my-8 gap-y-1">
            <div v-if="game1">
              <span class="font-semibold text-gray-600">
                Started at {{ userFriendlyTime(game1.started_at) }}
              </span>

              <div class="grid grid-cols-1 divide-solid divide-y divide-gray-200">
                <h3
                  class="py-1"
                  v-for="(player, index) in game1.players"
                  :key="index"
                >
                  {{ player }}.
                </h3>
              </div>
            </div>

            <h3
              v-else
              class="text-gray-500 py-1"
            >
              No match started
            </h3>
          </div>

          <cv-button
            kind="tertiary"
            :icon="ViewNext20"
            @click="startGame(1)"
          >
            Next Match
          </cv-button>
        </cv-tile>
      </cv-column>

      <cv-column>
        <cv-tile>
          <div class="flex items-center justify-between">
            <h2 class="flex items-end space-x-2">
              <span>Table 2</span>

              <cv-link
                to="/table/2"
                :icon="ScreenMap20"
                class="mb-1.5 -scale-x-100 opacity-75 hover:opacity-100"
              />
            </h2>

            <cv-tag
              v-if="game2"
              kind="green"
              label="Live"
            />
          </div>

          <div class="flex flex-col my-8 gap-y-1">
            <div v-if="game2">
              <span class="font-semibold text-gray-600">
                Started at {{ userFriendlyTime(game2.started_at) }}
              </span>

              <div class="grid grid-cols-1 divide-solid divide-y divide-gray-200">
                <h3
                  class="py-1"
                  v-for="(player, index) in game2.players"
                  :key="index"
                >
                  {{ player }}.
                </h3>
              </div>
            </div>

            <h3
              v-else
              class="text-gray-500 py-1"
            >
              No match started
            </h3>
          </div>

          <cv-button
            kind="tertiary"
            :icon="ViewNext20"
            @click="startGame(2)"
          >
            Next Match
          </cv-button>
        </cv-tile>
      </cv-column>
    </cv-row>

    <cv-row class="mb-6">
      <cv-column>
        <div
          class="cv-data-table"
          style="width: 100%"
        >
          <div class="bx--data-table-container bx--data-table--max-width">
            <div class="bx--data-table-header">
              <h4 class="bx--data-table-header__title">In queue</h4>
            </div>

            <div class="bx--data-table-content">
              <div>
                <table class="bx--data-table bx--data-table--lg">
                  <thead>
                    <tr>
                      <th><span class="bx--table-header-label">First name</span></th>
                      <th><span class="bx--table-header-label">Last name</span></th>
                      <th><span class="bx--table-header-label">Checked in at</span></th>
                    </tr>
                  </thead>

                  <tbody v-if="store.initialStateLoading">
                    <tr>
                      <td>
                        <skeleton />
                      </td>
                      <td>
                        <skeleton />
                      </td>
                      <td>
                        <skeleton />
                      </td>
                    </tr>
                  </tbody>

                  <sortable
                    v-else
                    tag="tbody"
                    class="table1-queue"
                    :list="store.table1Queue"
                    item-key="id"
                    :options="{ group: { name: 'table2', put: ['unassigned', 'table1'] } }"
                    @add="onAdd"
                    @update="onUpdate"
                  >
                    <template #item="{ element, index }">
                      <tr
                        class="draggable cv-data-table-row-inner cv-data-table-row"
                        :key="element.id"
                        :value="element.id"
                      >
                        <td>{{ element.first_name }}</td>
                        <td>{{ element.last_name }}</td>
                        <td>{{ userFriendlyDate(element.created_at) }}</td>
                      </tr>
                    </template>
                  </sortable>
                </table>
              </div>
            </div>
          </div>
        </div>
      </cv-column>

      <cv-column>
        <div
          class="cv-data-table"
          style="width: 100%"
        >
          <div class="bx--data-table-container bx--data-table--max-width">
            <div class="bx--data-table-header">
              <h4 class="bx--data-table-header__title">In queue</h4>
            </div>

            <div class="bx--data-table-content">
              <div>
                <table class="bx--data-table bx--data-table--lg">
                  <thead>
                    <tr>
                      <th><span class="bx--table-header-label">First name</span></th>
                      <th><span class="bx--table-header-label">Last name</span></th>
                      <th><span class="bx--table-header-label">Checked in at</span></th>
                    </tr>
                  </thead>

                  <tbody v-if="store.initialStateLoading">
                    <tr>
                      <td>
                        <skeleton />
                      </td>
                      <td>
                        <skeleton />
                      </td>
                      <td>
                        <skeleton />
                      </td>
                    </tr>
                  </tbody>

                  <sortable
                    v-else
                    tag="tbody"
                    class="table2-queue"
                    :list="store.table2Queue"
                    item-key="id"
                    :options="{ group: { name: 'table1', put: ['unassigned', 'table2'] } }"
                    @add="onAdd"
                    @update="onUpdate"
                  >
                    <template #item="{ element, index }">
                      <tr
                        class="draggable cv-data-table-row-inner cv-data-table-row"
                        :key="element.id"
                        :value="element.id"
                      >
                        <td>{{ element.first_name }}</td>
                        <td>{{ element.last_name }}</td>
                        <td>{{ userFriendlyDate(element.created_at) }}</td>
                      </tr>
                    </template>
                  </sortable>
                </table>
              </div>
            </div>
          </div>
        </div>
      </cv-column>
    </cv-row>

    <cv-row>
      <cv-column>
        <div
          class="cv-data-table"
          style="width: 100%"
        >
          <div class="bx--data-table-container bx--data-table--max-width">
            <div class="bx--data-table-header">
              <h4 class="bx--data-table-header__title">Players waiting for assignment</h4>
            </div>

            <div class="bx--data-table-content">
              <div>
                <table class="bx--data-table bx--data-table--lg">
                  <thead>
                    <tr>
                      <th><span class="bx--table-header-label">First name</span></th>
                      <th><span class="bx--table-header-label">Last name</span></th>
                      <th><span class="bx--table-header-label">Checked in at</span></th>
                      <th class="w-20"></th>
                    </tr>
                  </thead>

                  <tbody v-if="store.initialStateLoading">
                    <tr>
                      <td>
                        <skeleton />
                      </td>
                      <td>
                        <skeleton />
                      </td>
                      <td>
                        <skeleton />
                      </td>
                      <td class="w-20">
                        <skeleton />
                      </td>
                    </tr>
                  </tbody>

                  <tbody v-else-if="!store.unassignedPlayers.length">
                    <tr>
                      <td colspan="4">
                        <div class="flex items-center justify-center italic">
                          No players have been added to the queue yet.
                        </div>
                      </td>
                    </tr>
                  </tbody>

                  <sortable
                    v-else
                    tag="tbody"
                    class="unassigned-queue"
                    :list="store.unassignedPlayers"
                    item-key="id"
                    :options="{ group: { name: 'unassigned', put: ['table1', 'table2'] } }"
                    @add="onAdd"
                    @update="onUpdate"
                  >
                    <template #item="{ element, index }">
                      <tr
                        class="draggable cv-data-table-row-inner cv-data-table-row"
                        :key="element.id"
                        :value="element.id"
                      >
                        <td>{{ element.first_name }}</td>
                        <td>{{ element.last_name }}</td>
                        <td>{{ userFriendlyDate(element.created_at) }}</td>
                        <td class="w-20">
                          <cv-button
                            kind="ghost"
                            :icon="TrashCan24"
                            @click="onRemoveClick(element)"
                          />
                        </td>
                      </tr>
                    </template>
                  </sortable>
                </table>
              </div>
            </div>
          </div>
        </div>
      </cv-column>
    </cv-row>
  </cv-grid>

  <cv-modal
    :visible="showDeleteModal"
    kind="danger"
    @primary-click="onRemovePlayer"
  >
    <template #title>Are you sure?</template>
    <template #primary-button>Remove Player</template>
    <template #secondary-button>Cancel</template>

    <template v-slot:content>
      <p>
        Are you sure you want to remove {{ selectedPlayer?.first_name }}
        {{ selectedPlayer?.last_name[0] }}? This action cannot be undone.
      </p>
    </template>
  </cv-modal>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { Skeleton } from '@brayamvalero/vue3-skeleton'
  import { format } from 'date-fns'
  import { Timestamp } from 'firebase/firestore'
  import { Sortable } from 'sortablejs-vue3'
  import { useTableTennisRegistrationStore } from '@/stores/table_tennis_registration'

  import type { SortableEvent } from 'sortablejs'

  import ScreenMap20 from '@carbon/icons-vue/es/screen-map/20'
  import TrashCan24 from '@carbon/icons-vue/es/trash-can/24'
  import ViewNext20 from '@carbon/icons-vue/es/view-next/20'

  import '@brayamvalero/vue3-skeleton/dist/style.css'

  const store = useTableTennisRegistrationStore()

  onMounted(() => {
    store.initializeState()
  })

  const game1 = computed(() => store.games?.find((game) => game.table_number === 1))
  const game2 = computed(() => store.games?.find((game) => game.table_number === 2))

  const selectedPlayer = ref(null)
  const showDeleteModal = ref(false)

  const userFriendlyTime = (date: object) => {
    const timestamp = new Timestamp(date['seconds'], date['nanoseconds']).toDate()
    return format(timestamp, 'h:mm a')
  }

  const userFriendlyDate = (date: object) => {
    const timestamp = new Timestamp(date['seconds'], date['nanoseconds']).toDate()
    return format(timestamp, 'P h:mm aaaa')
  }

  const tableMap = {
    'unassigned-queue': 0,
    'table1-queue': 1,
    'table2-queue': 2
  }

  const onAdd = async (event: SortableEvent) => {
    const { from, item, newIndex, to } = event
    const fromTableNumber = tableMap[from.classList[0]]
    const toTableNumber = tableMap[to.classList[0]]
    const id = item.getAttribute('value')

    await store.move(fromTableNumber, toTableNumber, id, newIndex)

    document.querySelector('[draggable=false]')?.remove()
  }

  const onRemoveClick = (player) => {
    selectedPlayer.value = player
    showDeleteModal.value = true
  }

  const onRemovePlayer = () => {
    store.removePlayer(selectedPlayer.value.id)

    selectedPlayer.value = null
    showDeleteModal.value = false
  }

  const onUpdate = (event: SortableEvent) => {
    const { from, item, newIndex, oldIndex } = event
    const tableNumber = tableMap[from.classList[0]]
    const id = item.getAttribute('value')

    if (newIndex === oldIndex) {
      return
    }

    store.reorder(tableNumber, id, oldIndex, newIndex)
  }

  const startGame = (tableNumber: number) => {
    store.startGame(tableNumber)
  }
</script>
