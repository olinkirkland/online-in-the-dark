import { useGameStore } from '@/stores/game-store';
import { v4 as uuidv4 } from 'uuid';
import { Cohort } from './sheets/crew-sheet';

export function makeGang(gangType: string) {
  const codex = useGameStore().game?.codex;
  const gang: Cohort = {
    id: uuidv4(),
    name: `Gang of ${gangType}s`,
    description: 'Edit this gang to customize its Edges and Flaws.',
    cohortType: 'gang',
    edges:
      codex?.sheets?.crew?.cohorts?.edges.map(
        (edge: { name: string; description: string }) => ({
          ...edge,
          id: 'edge-' + name,
          quantity: 0,
          maxQuantity: 1
        })
      ) || [],
    flaws:
      codex?.sheets?.crew?.cohorts?.flaws.map(
        (flaw: { name: string; description: string }) => ({
          ...flaw,
          id: 'flaw-' + name,
          quantity: 0,
          maxQuantity: 1
        })
      ) || [],
    gangType: [
      {
        id: 'gangType-adepts',
        name: 'Adepts',
        description: 'Scholars, tinkerers, occultists, and chemists',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'gangType-rooks',
        name: 'Rooks',
        description: 'Con artists, spies, and socialites',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'gangType-rovers',
        name: 'Rovers',
        description: 'Sailors, carriage drivers, and scavengers',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'gangType-skulks',
        name: 'Skulks',
        description: 'Scouts, infiltrators, and thieves',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'gangType-thugs',
        name: 'Thugs',
        description: 'Killers, brawlers, and roustabouts',
        quantity: 0,
        maxQuantity: 1
      }
    ],
    harm:
      codex?.sheets?.crew?.cohorts?.harm.map(
        (harm: { name: string; description: string }) => ({
          ...harm,
          id: 'harm-' + name,
          quantity: 0,
          maxQuantity: 1
        })
      ) || [],
    quality: 0,
    scale: 0
  };

  const gangTypeId = 'gangType-' + gangType.toLowerCase();
  console.log(gangTypeId);
  gang.gangType!.find((type) => type.id === gangTypeId)!.quantity = 1;
  gang.edges[0].quantity = 1;
  gang.flaws[0].quantity = 1;
  return gang;
}
