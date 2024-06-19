export enum PlayerRole {
  PLAYER = 'player',
  GM = 'gm',
  ADMIN = 'admin'
}

export type Player = {
  username: string;
  portrait: string;
  isGuest: boolean;
  isOnline: boolean;
  role: PlayerRole;
};

export type Game = {
  _id: string;
  name: string;
  coverImage: string;
  dateCreated: Date;
  inviteCode: string;

  players: Record<string, Player>;

  codex: any;

  data: any;
};
