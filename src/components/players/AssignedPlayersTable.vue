<template>
    <player-queue-table :data="data" :is-loading="isLoading" :title="title" @row-select-change="onRowSelectChange"
        @row-select-changes="onRowSelectChanges">
        <template #batch-actions>
            <cv-button>
                {{ batchActionTitle }}
            </cv-button>
        </template>
    </player-queue-table>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { usePlayerRegistrationStore } from '@/stores/table_tennis_registration'

import PlayerQueueTable from '@/components/players/QueueTable.vue'

interface Props {
    batchActionTitle: string,
    tableNumber: number,
    title?: string
}

const props = defineProps<Props>()

const playerRegistrationStore = usePlayerRegistrationStore()

const { data, isLoading } = useQuery({
    queryKey: ['getRegistrationsForTable', props.tableNumber],
    queryFn: async () => await playerRegistrationStore.getRegistrationsForTable(props.tableNumber)
})

// const onRowSelectChange = () => {
//     console.log('row select change')
//     console.log(arguments)
// }

// const onRowSelectChanges = () => {
//     console.log('row select changes')
// }
</script>