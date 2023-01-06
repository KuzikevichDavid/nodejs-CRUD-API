import { config } from 'dotenv';

config();

const isCluster = process.argv[2];

if (isCluster && isCluster.toLowerCase() === '--cluster') {
  null;
} else import('./net/serverInstance');
