<template>
    <cv-grid>
        <cv-row>
            <cv-column>
                <h2 class="mb-4">Players in Queue</h2>
            </cv-column>
        </cv-row>

        <cv-row>
            <cv-column>
                <player-queue-table :data="data" :is-loading="isLoading" />
            </cv-column>
        </cv-row>
    </cv-grid>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { usePlayerRegistrationStore } from '@/stores/player_registration'

import PlayerQueueTable from '@/components/players/QueueTable.vue'

const playerRegistrationStore = usePlayerRegistrationStore()

const { isLoading, isError, data, error } = useQuery({
    queryKey: ['playerRegistrations'],
    queryFn: playerRegistrationStore.getAllRegistrations
})
</script>