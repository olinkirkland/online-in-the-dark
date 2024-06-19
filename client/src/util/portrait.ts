import portraitJson from '@/assets/data/portrait-images.json';

export type Portrait = {
  id: string;
  name: string;
  author: string;
  source: string;
  url: string;
  commonColor: string;
};

export function getPortrait(id: string | undefined): Portrait {
  const defaultPortrait = portraitJson.find(
    (p) => p.id === '791e4a6b-8f2e-41b2-8410-09fdb69d22e2'
  )!;

  if (!id) return defaultPortrait;
  const portrait = portraitJson.find((p) => id === p.id);
  return portrait || defaultPortrait;
}
