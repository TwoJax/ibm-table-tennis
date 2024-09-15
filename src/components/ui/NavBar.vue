<template>
    <cv-header aria-label="Carbon tutorial">
        <cv-skip-to-content href="#main-content">Skip to content</cv-skip-to-content>

        <cv-header-name to="/" prefix="IBM">
            Table Tennis
        </cv-header-name>

        <template v-slot:header-global>
            <cv-header-global-action :active="playerModalVisible" aria-label="Sign in new player" label="Sign in player"
                @click="() => $emit('open-modal')">
                <user-follow-20 />
            </cv-header-global-action>

            <cv-header-global-action aria-label="App switcher" label="App Switcher" tipAlignment="end"
                @click="() => appSwitcherVisible = !appSwitcherVisible">
                <switcher-20 />
            </cv-header-global-action>
        </template>

        <template v-slot:right-panels>
            <app-switcher :visible="appSwitcherVisible" @close="appSwitcherVisible = false" />
        </template>
    </cv-header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import UserFollow20 from '@carbon/icons-vue/es/user--follow/20';
import Switcher20 from '@carbon/icons-vue/es/switcher/20';
import AppSwitcher from '@/components/ui/AppSwitcher.vue'

defineEmits(['open-modal'])

interface Props {
    playerModalVisible: boolean
}

defineProps<Props>()

const appSwitcherVisible = ref(false)
</script>
