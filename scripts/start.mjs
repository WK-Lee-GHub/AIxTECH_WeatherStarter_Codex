import { spawn } from 'node:child_process';
import { join } from 'node:path';

const nodeOptions = [process.env.NODE_OPTIONS, '--disable-warning=ExperimentalWarning']
  .filter(Boolean)
  .join(' ');

const serverScript = join(process.cwd(), 'backend', 'dist', 'server.js');

const child = spawn(process.execPath, [serverScript], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'production',
    NODE_OPTIONS: nodeOptions,
  },
});

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 0);
});
