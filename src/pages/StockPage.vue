<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <p>stock page</p>
  <p>{{ route.params.abbr }}</p>
</template>
