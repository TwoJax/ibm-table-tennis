<template>
  <cv-data-table>
    <template #headings>
      <cv-data-table-heading heading="First name" name="first_name" />
      <cv-data-table-heading heading="Last name" name="last_name" />
    </template>

    <template #data>
      <cv-data-table-row v-if="isLoading">
        <cv-data-table-cell>
          <cv-skeleton-text></cv-skeleton-text>
        </cv-data-table-cell>

        <cv-data-table-cell>
          <cv-skeleton-text></cv-skeleton-text>
        </cv-data-table-cell>
      </cv-data-table-row>

      <cv-data-table-row v-else v-for="player in data" :key="player.id">
        <cv-data-table-cell>{{ player.first_name }}</cv-data-table-cell>
        <cv-data-table-cell>{{ player.last_name }}</cv-data-table-cell>
      </cv-data-table-row>
    </template>
  </cv-data-table>
</template>

<script setup lang="ts">
interface Props {
  data: object,
  isLoading: boolean,
}

withDefaults(defineProps<Props>(),{
  data: {},
  isLoading: false,
})
</script>
