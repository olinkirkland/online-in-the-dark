import { server } from '@/api/connection';

let serverVersion: string;
export async function getServerVersion() {
  if (!serverVersion) serverVersion = (await server.get('/version')).data;
  return serverVersion;
}
