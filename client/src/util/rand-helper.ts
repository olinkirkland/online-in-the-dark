export function randInt(max: number): number {
  return randIntBetween(0, max);
}

export function randIntBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export function pick(arr: any[]): any {
  return arr[randInt(arr.length)];
}