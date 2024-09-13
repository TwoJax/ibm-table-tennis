<template>
    <cv-grid>
        <cv-row class="mb-8">
            <cv-column>
                <h1>Player Queue</h1>
            </cv-column>
        </cv-row>

        <cv-row class="mb-6">
            <cv-column>
                <h3 class="mb-4">Table 1 Queue</h3>

                <player-queue-table :data="data" :is-loading="isLoading" />
            </cv-column>

            <cv-column>
                <h3 class="mb-4">Table 2 Queue</h3>

                <player-queue-table :data="data" :is-loading="isLoading" />
            </cv-column>
        </cv-row>

        <cv-row>
            <cv-column>
                <h4 class="mb-4">Players awaiting table assignment</h4>

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
