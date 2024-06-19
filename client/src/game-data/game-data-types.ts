export type Thing = {
  id: string;
  name: string;
  description: string;
};

export type Chooseable = {
  quantity: number; // Usually 0-1
  maxQuantity: number; // Usually 1
};

export type Item = Thing &
  Chooseable & {
    load: number; // 0-3
    maxLoad: number; // 1-3
  };

export type Effectable = Thing &
  Chooseable & {
    effect?: string; // TODO: Turn this into a type that gets processed by the game
  };

export type Person = Thing & {
  attitude: number; // -3 to 3
};

export type Faction = Person & {
  friends: string[];
  rivals: string[];
  clocks: Clock[];
};

export type Clock = Thing & {
  value: number;
  segments: number;
};
