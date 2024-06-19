const firstNames = [
  "Adric", "Aldo", "Amison", "Andrel",
  "Arcy", "Arden", "Arilyn", "Arquo", "Arvus", "Ashlyn",
  "Branon", "Brace", "Brance", "Brena", "Bricks",
  "Candra", "Canter", "Carissa", "Carro", "Casslyn",
  "Cavelle", "Clave", "Corille", "Cross", "Crowl",
  "Cyrene", "Daphnia", "Drav", "Edlun", "Emeline",
  "Grell", "Helles", "Hix", "Holtz", "Kamelin", "Kelyr",
  "Kobb", "Kristov", "Laudius", "Lauria", "Lenia",
  "Lizete", "Lorette", "Lucella", "Lynthia", "Mara",
  "Milos", "Morlan", "Myre", "Narcus", "Naria",
  "Noggs", "Odrienne", "Orlan", "Phin", "Polonia",
  "Quess", "Remira", "Ring", "Roethe", "Sesereth",
  "Sethla", "Skannon", "Stavrul", "Stev", "Syra",
  "Talitha", "Tesslyn", "Thena", "Timoth", "Tocker",
  "Una", "Vaurin", "Veleris", "Veretta", "Vestine", "Vey",
  "Volette", "Vond", "Weaver", "Wester", "Zamira"
];

const familyNames = [
  "Arran", "Athanoch",
  "Basran", "Boden", "Booker", "Ankhayat",
  "Bowmore", "Breakiron", "Brogan", "Clelland",
  "Clermont", "Coleburn", "Comber", "Daava",
  "Dalmore", "Danfield", "Dunvil", "Edrad", "Farros",
  "Grine", "Haig", "Helker", "Helles", "Hellyers",
  "Jayan", "Jeduin", "Kardera", "Karstas", "Keel",
  "Kessarin", "Kinclaith", "Lomond", "Maroden",
  "Michter", "Morriston", "Penderyn", "Prichard",
  "Rowan", "Salkara", "Sevoy", "Skelkallan", "Slane",
  "Strangford", "Strathmill", "Templeton",
  "Tyrconnell", "Vale", "Vedat", "Walund"
]

const adjectives = ['tiny', 'big', 'happy', 'sad', 'smart', 'funny', 'serious', 'crazy', 'silly', 'brave', 'shy', 'loud', 'quiet', 'fast', 'slow', 'strong', 'weak', 'bright', 'dark', 'hot', 'cold', 'hard', 'soft', 'sharp', 'dull', 'clean', 'dirty', 'smooth', 'rough', 'old', 'new', 'sweet', 'sour', 'bitter', 'spicy', 'tasty', 'gross', 'fresh', 'stale', 'thick', 'thin', 'straight', 'curved', 'simple', 'complex', 'friendly', 'fierce', 'gentle', 'wild', 'calm'];
const nouns = ['dog', 'cat', 'bird', 'fish', 'rabbit', 'lion', 'tiger', 'elephant', 'monkey', 'snake', 'turtle', 'spider', 'horse', 'cow', 'sheep', 'goat', 'pig', 'chicken', 'duck', 'mouse', 'bear', 'fox', 'wolf', 'deer', 'whale', 'shark', 'dolphin', 'octopus', 'frog', 'crocodile', 'dragon', 'unicorn', 'phoenix', 'eagle', 'hawk', 'owl', 'penguin', 'koala', 'panda', 'squirrel', 'bat', 'bee', 'ant', 'butterfly', 'mosquito', 'snail', 'slug', 'lizard', 'crab', 'lobster', 'starfish', 'tree', 'flower', 'mountain', 'river', 'ocean', 'lake', 'island', 'desert', 'forest', 'cave', 'rock', 'cloud', 'sun', 'moon', 'star', 'planet', 'galaxy', 'comet', 'asteroid', 'meteor', 'rain', 'snow', 'wind', 'storm', 'rainbow', 'thunder', 'lightning', 'fire', 'ice', 'earth', 'sky', 'sea', 'sand', 'dust', 'grass', 'leaf', 'root', 'branch', 'twig', 'stone', 'pebble', 'sand', 'soil', 'mud', 'clay', 'metal', 'gold', 'silver', 'copper', 'iron', 'bronze', 'steel', 'aluminum', 'platinum', 'diamond', 'ruby', 'sapphire', 'emerald', 'crystal', 'gem', 'pearl', 'amber', 'ivory', 'bone', 'horn', 'feather', 'fur', 'hair', 'wool', 'silk', 'cotton', 'leather', 'cloth', 'fabric', 'thread', 'needle', 'scissors', 'knife', 'sword', 'shield', 'bow', 'arrow', 'spear', 'axe', 'hammer', 'nail', 'screw', 'bolt', 'nut', 'washer', 'glue', 'tape', 'rope', 'chain', 'wire', 'cable', 'net', 'mesh', 'web', 'hook', 'latch', 'lock', 'key', 'door', 'window', 'wall', 'floor', 'ceiling', 'roof', 'stairs', 'bridge', 'path', 'road', 'street', 'alley', 'lane', 'highway', 'avenue', 'boulevard', 'square', 'park', 'garden', 'yard', 'field', 'meadow', 'pasture', 'orchard', 'vineyard', 'farm', 'barn', 'shed', 'house', 'home', 'cottage', 'cabin', 'villa', 'palace', 'castle', 'tower', 'fort', 'church', 'temple', 'mosque', 'synagogue', 'shrine', 'monastery', 'cathedral', 'chapel', 'grave', 'tomb', 'crypt', 'pyramid', 'sphinx', 'statue', 'monument', 'obelisk', 'arch', 'gate', 'fence', 'wall', 'hedge', 'barrier', 'barricade', 'fountain', 'pool', 'pond', 'lake', 'river', 'stream', 'waterfall', 'spring', 'well', 'oasis', 'beach', 'coast', 'cliff', 'canyon', 'valley', 'plateau', 'mountain', 'hill', 'peak', 'summit', 'volcano', 'crater', 'glacier', 'iceberg', 'cave', 'tunnel', 'mine', 'cemetery', 'graveyard', 'mausoleum', 'sanctuary', 'altar', 'shrine', 'mosque', 'temple', 'church', 'synagogue', 'cathedral', 'monastery', 'abbey', 'cloister', 'nunnery', 'chapel', 'crypt', 'tomb', 'grave', 'ossuary', 'sarcophagus', 'catacomb', 'columbarium', 'graveyard', 'cemetary', 'burialground', 'necropolis', 'pyramid', 'museum', 'gallery', 'exhibition', 'exhibit', 'art', 'sculpture', 'painting', 'portrait', 'landscape', 'stilllife', 'history', 'ancient', 'medieval', 'renaissance', 'modern', 'contemporary', 'abstract', 'realism', 'impressionism', 'expressionism', 'surrealism', 'cubism', 'dadaism', 'futurism', 'constructivism', 'minimalism', 'popart', 'opart', 'kineticart', 'environmentalart', 'performanceart', 'installationart', 'conceptualart', 'videoart', 'digitalart', 'netart', 'virtualart', 'interactivart', 'landart', 'streetart', 'graffiti', 'photography', 'photojournalism', 'documentary', 'landscape', 'portrait', 'wildlife', 'nature', 'macro', 'micro', 'aerial', 'underwater', 'night', 'longexposure', 'blackandwhite', 'color', 'fineart', 'commercial', 'editorial', 'fashion', 'beauty', 'portrait', 'product', 'food', 'interior', 'architecture', 'cityscape', 'event', 'wedding', 'sports', 'action', 'adventure', 'travel', 'street', 'documentary', 'candid', 'photojournalism', 'landscape', 'wildlife', 'nature', 'macro', 'aerial', 'underwater', 'night', 'longexposure', 'blackandwhite', 'color', 'fineart', 'commercial', 'editorial', 'fashion', 'beauty', 'portrait', 'product', 'food', 'interior', 'architecture', 'cityscape', 'event', 'wedding', 'sports', 'action', 'adventure', 'travel', 'street', 'documentary', 'candid'];


export function makeRandomName() {
  // Random first name and family name, kebab-cased, with a random integer
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const familyName = familyNames[Math.floor(Math.random() * familyNames.length)];
  const n = Math.floor(Math.random() * 900) + 100;
  return `${firstName}${familyName}${n}`;
}

export function makeRandomPassword() {
  // 8 random characters
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 8; i++)
    password += chars[Math.floor(Math.random() * chars.length)];
  return password;
}

export function makeGameInviteCode() {
  // Random adjective and noun, kebab-cased, with a random integer
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const n = Math.floor(Math.random() * 900) + 100;
  const inviteCode = `${adjective}-${noun}-${n}`;

  // TODO: Ensure the invite code is unique
  // probably unnecessary, since the chance of a collision is very low
  
  return inviteCode;
}