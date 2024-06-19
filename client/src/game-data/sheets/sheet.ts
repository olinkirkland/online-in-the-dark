import { useUserStore } from '@/stores/user-store';
import { v4 as uuidv4 } from 'uuid';

export default class Sheet {
  id: string;
  sheetType: string;
  createdBy: string; // The id of the player who created the sheet
  createdAt: number; // The timestamp of when the sheet was created
  image: string;
  lockLevel: number;

  constructor() {
    this.id = uuidv4();
    this.sheetType = 'sheet';
    this.createdBy = useUserStore().id;
    this.createdAt = Date.now();
    this.image = '';
    this.lockLevel = 99;
  }
}
