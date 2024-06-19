// Slow middleware
export default async function slow(req: any, res: any, next: () => void) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  next();
}
