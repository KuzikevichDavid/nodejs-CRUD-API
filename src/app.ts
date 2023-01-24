import cluster from 'cluster';
import { config } from 'dotenv';
import { spawn } from './net/cluster';
import { start } from './net/serverInstance';
import { remoteUserRepo } from './repositories/remoteUserRepo';
import { setRepo } from './repositories/users';

if (!process.env.TASK3_REST_API_PORT) config();

const isCluster = process.argv[2];

if (isCluster && isCluster.toLowerCase() === '--cluster') {
  if (cluster.isPrimary) spawn();
  else {
    setRepo(new remoteUserRepo());
    start();
  }
} else {
  start();
}
