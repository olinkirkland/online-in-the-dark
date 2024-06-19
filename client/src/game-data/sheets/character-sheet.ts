import { Clock, Effectable } from '../game-data-types';
import Sheet from './sheet';

export type Harm = {
  level: number; // 0-4
  description: string;
};

export class Character extends Sheet {
  ui: { [key: string]: boolean } = {};

  crewId: string = ''; // The  crew this character is a part of

  characterType: string = '';
  characterTypeDescription: string = '';
  image: string = '';

  name: string = 'Unnamed Character';
  alias: string = 'A Mysterious Stranger';
  look: string;
  heritage: string;
  heritageDescription: string;
  background: string;
  backgroundDescription: string;
  notes: string = '';

  vice: string;
  vicePurveyor: string;

  stress: number; // 0-9
  maxStress: number;

  trauma: Effectable[];
  maxTrauma: number;

  harm: Harm[];
  healingClock: Clock = {
    id: 'healing',
    name: 'healing',
    description: '',
    segments: 4,
    value: 0
  };

  constructor() {
    super();
    this.sheetType = 'character';
  }
}

export class Cutter extends Character {
  constructor() {
    super();
    this.characterType = 'Cutter';
    this.characterTypeDescription = 'A dangerous and intimidating fighter';
    this.image = '24fcce82-058a-4ba0-a517-d93167226b7b';
  }
}

export class Hound extends Character {
  constructor() {
    super();
    this.characterType = 'Hound';
    this.characterTypeDescription = 'A deadly sharpshooter and tracker';
    this.image = '06c6e50e-b187-4161-99d4-01228ade7b96';
  }
}

export class Leech extends Character {
  constructor() {
    super();
    this.characterType = 'Leech';
    this.characterTypeDescription = 'A saboteur and technician';
    this.image = '1b7d14f9-73c8-4b89-88a0-db246cd8b8b4';
  }
}

export class Lurk extends Character {
  constructor() {
    super();
    this.characterType = 'Lurk';
    this.characterTypeDescription = 'A stealthy infiltrator and burglar';
    this.image = '9cec5287-f247-47ad-8eab-ed6a3ef82b0f';
  }
}

export class Slide extends Character {
  constructor() {
    super();
    this.characterType = 'Slide';
    this.characterTypeDescription = 'A subtle manipulator and spy';
    this.image = '10f1b3a4-b4c3-4755-a66d-17181ba317b2';
  }
}

export class Spider extends Character {
  constructor() {
    super();
    this.characterType = 'Spider';
    this.characterTypeDescription = 'A devious mastermind';
    this.image = '1f6e47b6-c3c6-47b9-8b19-e553e6362de2';
  }
}

export class Whisper extends Character {
  constructor() {
    super();
    this.characterType = 'Whisper';
    this.characterTypeDescription = 'An arcane adept and channeler';
    this.image = '88a1879b-06a3-4632-897b-e0cd7e423c46';
  }
}

export class Ghost extends Character {
  constructor() {
    super();
    this.characterType = 'Ghost';
    this.characterTypeDescription = 'A spirit without a body';
    this.image = '9f5d267b-83f1-40e5-9ff6-04d1c92a3d21';
  }
}

export class Hull extends Character {
  constructor() {
    super();
    this.characterType = 'Hull';
    this.characterTypeDescription = 'A spirit animating a clockwork frame';
    this.image = 'aa5271f0-4d79-4ae7-9348-8bbeae94a27f';
  }
}

export class Vampire extends Character {
  constructor() {
    super();
    this.characterType = 'Vampire';
    this.characterTypeDescription = 'A spirit animating an undead body';
    this.image = '9cec5287-f247-47ad-8eab-ed6a3ef82b0f';
  }
}

export function createCharacterTemplates() {
  return {
    cutter: new Cutter(),
    hound: new Hound(),
    leech: new Leech(),
    lurk: new Lurk(),
    slide: new Slide(),
    spider: new Spider(),
    whisper: new Whisper(),
    ghost: new Ghost(),
    hull: new Hull(),
    vampire: new Vampire()
  };
}
