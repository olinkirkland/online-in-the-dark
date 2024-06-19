<template>
  <div class="page">
    <h1>INVITE PAGE</h1>
    <Panel>
      <p>{{ inviteCode }}</p>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { acceptInvite } from '@/api/invite';
import Panel from '@/components/modals/Panel.vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const inviteCode = route.params.code as string;
onMounted(() => {
  acceptInvite(inviteCode);
});
</script>

<style scoped lang="scss"></style>
