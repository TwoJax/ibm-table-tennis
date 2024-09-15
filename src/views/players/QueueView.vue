<template>
    <cv-grid>
        <cv-row class="mb-6">
            <cv-column>
                <cv-tile>
                    <div class="flex items-center justify-between">
                        <h2>Table 1</h2>
                        <cv-tag kind="green" label="Live" />
                    </div>

                    <div class="flex flex-col my-8 gap-y-1">
                        <h3 class="text-gray-500 py-1">No match started</h3>
                    </div>

                    <cv-button kind="tertiary" :icon="ViewNext20">Next Match</cv-button>
                </cv-tile>
            </cv-column>

            <cv-column>
                <cv-tile>
                    <div class="flex items-center justify-between">
                        <h2>Table 2</h2>
                        <cv-tag kind="green" label="Live" />
                    </div>

                    <div class="flex flex-col my-8 gap-y-1">
                        <span class="font-semibold text-gray-600">Started at 1:20 PM</span>

                        <div class="grid grid-cols-1 divide-solid divide-y divide-gray-200">
                            <h3 class="py-1">Brandon C.</h3>
                            <h3 class="py-1">Steve M.</h3>
                        </div>
                    </div>

                    <cv-button kind="tertiary" :icon="ViewNext20">Next Match</cv-button>
                </cv-tile>
            </cv-column>
        </cv-row>

        <cv-row class="mb-6">
            <cv-column>
                <div class="cv-data-table" style="width: 100%;">
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

                                    <sortable v-else tag="tbody" class="table1-queue" :list="store.table1Queue"
                                        item-key="id"
                                        :options="{ group: { name: 'table2', put: ['unassigned', 'table1'] } }"
                                        @add="onAdd" @update="onUpdate">
                                        <template #item="{ element, index }">
                                            <tr class="draggable cv-data-table-row-inner cv-data-table-row"
                                                :key="element.id" :value="element.id">
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
                <div class="cv-data-table" style="width: 100%;">
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

                                    <sortable v-else tag="tbody" class="table2-queue" :list="store.table2Queue"
                                        item-key="id"
                                        :options="{ group: { name: 'table1', put: ['unassigned', 'table2'] } }"
                                        @add="onAdd" @update="onUpdate">
                                        <template #item="{ element, index }">
                                            <tr class="draggable cv-data-table-row-inner cv-data-table-row"
                                                :key="element.id" :value="element.id">
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
                <div class="cv-data-table" style="width: 100%;">
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

                                    <sortable v-else tag="tbody" class="unassigned-queue"
                                        :list="store.unassignedPlayers" item-key="id"
                                        :options="{ group: { name: 'unassigned', put: ['table1', 'table2'] } }"
                                        @add="onAdd" @update="onUpdate">
                                        <template #item="{ element, index }">
                                            <tr class="draggable cv-data-table-row-inner cv-data-table-row"
                                                :key="element.id" :value="element.id">
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
    </cv-grid>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Skeleton } from '@brayamvalero/vue3-skeleton'
import { format } from 'date-fns'
import { Timestamp } from 'firebase/firestore'
import { Sortable } from 'sortablejs-vue3'
import { useTableTennisRegistrationStore } from '@/stores/table_tennis_registration'

import type { SortableEvent } from 'sortablejs'

import ViewNext20 from '@carbon/icons-vue/es/view-next/20'

import '@brayamvalero/vue3-skeleton/dist/style.css'

const store = useTableTennisRegistrationStore()

onMounted(() => {
    store.initializeState()
})

const userFriendlyDate = (date: object) => {
    const timestamp = new Timestamp(date['seconds'], date['nanoseconds']).toDate()
    return format(timestamp, 'P h:mm aaaa')
}

const tableMap = {
    'unassigned-queue': 0,
    'table1-queue': 1,
    'table2-queue': 2
}

const onAdd = async (event) => {
    console.log(event.clone);
    const { from, item, newIndex, to } = event
    const fromTableNumber = tableMap[from.classList[0]]
    const toTableNumber = tableMap[to.classList[0]]
    const id = item.getAttribute('value')

    await store.move(fromTableNumber, toTableNumber, id, newIndex)

    document.querySelector('[draggable=false]')?.remove()
}

const onUpdate = (event: SortableEvent) => {
    const { from, item, newIndex, oldIndex } = event
    const tableNumber = tableMap[from.classList[0]]
    const id = item.getAttribute('value')

    if (newIndex === oldIndex) { return }

    console.log(from, item, newIndex, oldIndex)

    store.reorder(tableNumber, id, oldIndex, newIndex)
}
</script>
