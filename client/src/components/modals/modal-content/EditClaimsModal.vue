<template>
  <ModalFrame>
    <template v-slot:header>
      <ModalHeader close-button>
        <h2>Edit Claims</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="edit-claims">
        <p>Select a claim below.</p>
        <ul>
          <li v-for="claim in props.claims" :key="claim.id">
            <button
              class="btn btn--text"
              @click="
                ModalController.open(EditClaimModal, {
                  claim,
                  onEdit: onEditClaim
                })
              "
            >
              <span>{{ claim.name }}</span>
            </button>
          </li>
        </ul>
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import { patch } from '@/controllers/game-controller';
import ModalController from '@/controllers/modal-controller';
import { Claim } from '@/game-data/sheets/crew-sheet';
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';
import EditClaimModal from './EditClaimModal.vue';

const props = defineProps<{
  sheetId: string;
  claims: Claim[];
}>();

function onEditClaim(claim: any) {
  const claimIndex = props.claims.findIndex((a) => a.id === claim.id);
  patch([
    {
      op: 'replace',
      path: `/data/sheets/${props.sheetId}/claims/${claimIndex}`,
      value: claim
    }
  ]);
}
</script>

<style scoped lang="scss">
.modal {
  .edit-claims {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    ul {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }
  }
}
:deep(.modal__header) {
  h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
