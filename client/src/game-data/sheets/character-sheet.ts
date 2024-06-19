import { Clock, Effectable, Person } from '../game-data-types';
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
  alias: string = '';
  look: string = '';
  heritage: string;
  heritageDescription: string;
  background: string;
  backgroundDescription: string;
  notes: string = '';

  vice: string = '';
  viceDescription: string = '';
  vicePurveyor: string = '';

  contacts: Person[] = [];
  contactsLabel: string = 'Contacts';

  stress: number = 0; // 0-9
  maxStress: number = 9;

  traumas: Effectable[];
  maxTraumas: number = 4;

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
    this.traumas = [
      {
        id: 'cold',
        name: 'Cold',
        description: 'You’re not moved by emotional appeals or social bonds.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'haunted',
        name: 'Haunted',
        description:
          'You’re often lost in reverie, reliving past horrors, seeing things.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'obsessed',
        name: 'Obsessed',
        description:
          'You’re enthralled by one thing: an activity, a person, an ideology.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'paranoid',
        name: 'Paranoid',
        description: 'You imagine danger everywhere; you can’t trust others.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'reckless',
        name: 'Reckless',
        description:
          'You have little regard for your own safety or best interests.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'soft',
        name: 'Soft',
        description:
          'You lose your edge; you become sentimental, passive, gentle.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'unstable',
        name: 'Unstable',
        description:
          'Your emotional state is volatile. You can instantly rage, or fall into despair, act impulsively, or freeze up.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'vicious',
        name: 'Vicious',
        description:
          'You seek out opportunities to hurt people, even for no good reason.',
        quantity: 0,
        maxQuantity: 1
      }
    ];
  }
}

export class Cutter extends Character {
  constructor() {
    super();
    this.name = 'Unnamed Cutter';
    this.characterType = 'Cutter';
    this.characterTypeDescription = 'A dangerous and intimidating fighter';
    this.image = '24fcce82-058a-4ba0-a517-d93167226b7b';

    this.contactsLabel = 'Dangerous Friends';
    this.contacts = [
      {
        id: 'marlane',
        name: 'Marlane',
        description: 'A pugilist',
        attitude: 0
      },
      {
        id: 'chael',
        name: 'Chael',
        description: 'A vicious thug',
        attitude: 0
      },
      {
        id: 'mercy',
        name: 'Mercy',
        description: 'A cold killer',
        attitude: 0
      },
      {
        id: 'grace',
        name: 'Grace',
        description: 'An extortionist',
        attitude: 0
      },
      {
        id: 'sawtooth',
        name: 'Sawtooth',
        description: 'A physicker',
        attitude: 0
      }
    ];
  }
}

export class Hound extends Character {
  constructor() {
    super();
    this.name = 'Unnamed Hound';
    this.characterType = 'Hound';
    this.characterTypeDescription = 'A deadly sharpshooter and tracker';
    this.image = '06c6e50e-b187-4161-99d4-01228ade7b96';

    this.contactsLabel = 'Deadly Friends';
    this.contacts = [
      {
        id: 'steiner',
        name: 'Steiner',
        description: 'An assassin',
        attitude: 0
      },
      {
        id: 'celene',
        name: 'Celene',
        description: 'A sentinel',
        attitude: 0
      },
      {
        id: 'melvir',
        name: 'Melvir',
        description: 'A physicker',
        attitude: 0
      },
      {
        id: 'veleris',
        name: 'Veleris',
        description: 'A spy',
        attitude: 0
      },
      {
        id: 'casta',
        name: 'Casta',
        description: 'A bounty hunter',
        attitude: 0
      }
    ];
  }
}

export class Leech extends Character {
  constructor() {
    super();
    this.name = 'Unnamed Leech';
    this.characterType = 'Leech';
    this.characterTypeDescription = 'A saboteur and technician';
    this.image = '1b7d14f9-73c8-4b89-88a0-db246cd8b8b4';

    this.contactsLabel = 'Clever Friends';
    this.contacts = [
      {
        id: 'stazia',
        name: 'Stazia',
        description: 'An apothecary',
        attitude: 0
      },
      {
        id: 'veldren',
        name: 'Veldren',
        description: 'A psychonaut',
        attitude: 0
      },
      {
        id: 'eckerd',
        name: 'Eckerd',
        description: 'A corpse thief',
        attitude: 0
      },
      {
        id: 'jul',
        name: 'Jul',
        description: 'A blood dealer',
        attitude: 0
      },
      {
        id: 'malista',
        name: 'Malista',
        description: 'A priestess',
        attitude: 0
      }
    ];
  }
}

export class Lurk extends Character {
  constructor() {
    super();
    this.name = 'Unnamed Lurk';
    this.characterType = 'Lurk';
    this.characterTypeDescription = 'A stealthy infiltrator and burglar';
    this.image = '9cec5287-f247-47ad-8eab-ed6a3ef82b0f';

    this.contactsLabel = 'Shady Friends';
    this.contacts = [
      {
        id: 'telda',
        name: 'Telda',
        description: 'A beggar',
        attitude: 0
      },
      {
        id: 'darmot',
        name: 'Darmot',
        description: 'A bluecoat',
        attitude: 0
      },
      {
        id: 'frake',
        name: 'Frake',
        description: 'A locksmith',
        attitude: 0
      },
      {
        id: 'roslyn_kellis',
        name: 'Roslyn Kellis',
        description: 'A noble',
        attitude: 0
      },
      {
        id: 'petra',
        name: 'Petra',
        description: 'A city clerk',
        attitude: 0
      }
    ];
  }
}

export class Slide extends Character {
  constructor() {
    super();
    this.name = 'Unnamed Slide';
    this.characterType = 'Slide';
    this.characterTypeDescription = 'A subtle manipulator and spy';
    this.image = '10f1b3a4-b4c3-4755-a66d-17181ba317b2';

    this.contactsLabel = 'Sly Friends';
    this.contacts = [
      {
        id: 'bryl',
        name: 'Bryl',
        description: 'A drug dealer',
        attitude: 0
      },
      {
        id: 'bazso_baz',
        name: 'Bazso Baz',
        description: 'A gang leader',
        attitude: 0
      },
      {
        id: 'klyra',
        name: 'Klyra',
        description: 'A tavern owner',
        attitude: 0
      },
      {
        id: 'nyryx',
        name: 'Nyryx',
        description: 'A prostitute',
        attitude: 0
      },
      {
        id: 'harker',
        name: 'Harker',
        description: 'A jail-bird',
        attitude: 0
      }
    ];
  }
}

export class Spider extends Character {
  constructor() {
    super();
    this.name = 'Unnamed Spider';
    this.characterType = 'Spider';
    this.characterTypeDescription = 'A devious mastermind';
    this.image = '1f6e47b6-c3c6-47b9-8b19-e553e6362de2';

    this.contactsLabel = 'Shrewd Friends';
    this.contacts = [
      {
        id: 'salia',
        name: 'Salia',
        description: 'An information broker',
        attitude: 0
      },
      {
        id: 'augus',
        name: 'Augus',
        description: 'A master architect',
        attitude: 0
      },
      {
        id: 'jennah',
        name: 'Jennah',
        description: 'A servant',
        attitude: 0
      },
      {
        id: 'riven',
        name: 'Riven',
        description: 'A chemist',
        attitude: 0
      },
      {
        id: 'jeren',
        name: 'Jeren',
        description: 'A bluecoat archivist',
        attitude: 0
      }
    ];
  }
}

export class Whisper extends Character {
  constructor() {
    super();
    this.name = 'Unnamed Whisper';
    this.characterType = 'Whisper';
    this.characterTypeDescription = 'An arcane adept and channeler';
    this.image = '88a1879b-06a3-4632-897b-e0cd7e423c46';

    this.contactsLabel = 'Strange Friends';
    this.contacts = [
      {
        id: 'nyryx',
        name: 'Nyryx',
        description: 'A possessor ghost',
        attitude: 0
      },
      {
        id: 'scurlock',
        name: 'Scurlock',
        description: 'A vampire',
        attitude: 0
      },
      {
        id: 'setarra',
        name: 'Setarra',
        description: 'A demon',
        attitude: 0
      },
      {
        id: 'quellyn',
        name: 'Quellyn',
        description: 'A witch',
        attitude: 0
      },
      {
        id: 'flint',
        name: 'Flint',
        description: 'A spirit trafficker',
        attitude: 0
      }
    ];
  }
}

export class Ghost extends Character {
  constructor() {
    super();
    this.name = 'Unnamed Ghost';
    this.characterType = 'Ghost';
    this.characterTypeDescription = 'A spirit without a body';
    this.image = '9f5d267b-83f1-40e5-9ff6-04d1c92a3d21';
  }
}

export class Hull extends Character {
  constructor() {
    super();
    this.name = 'Unnamed Hull';
    this.characterType = 'Hull';
    this.characterTypeDescription = 'A spirit animating a clockwork frame';
    this.image = 'aa5271f0-4d79-4ae7-9348-8bbeae94a27f';
  }
}

export class Vampire extends Character {
  constructor() {
    super();
    this.name = 'Unnamed Vampire';
    this.characterType = 'Vampire';
    this.characterTypeDescription = 'A spirit animating an undead body';
    this.image = '9cec5287-f247-47ad-8eab-ed6a3ef82b0f';

    this.contactsLabel = 'Dark Servants';
    this.contacts = [
      {
        id: 'rutherford',
        name: 'Rutherford',
        description: 'A butler',
        attitude: 0
      },
      {
        id: 'lylandra',
        name: 'Lylandra',
        description: 'A consort',
        attitude: 0
      },
      {
        id: 'kira',
        name: 'Kira',
        description: 'A bodyguard',
        attitude: 0
      },
      {
        id: 'otto',
        name: 'Otto',
        description: 'A coachman',
        attitude: 0
      },
      {
        id: 'edrik',
        name: 'Edrik',
        description: 'An envoy',
        attitude: 0
      }
    ];
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
