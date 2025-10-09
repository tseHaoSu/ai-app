import concurrently from 'concurrently';

concurrently(
   [
      {
         name: 'server',
         command: 'bun run dev',
         cwd: 'packages/server',
         prefixColor: 'blue',
      },
      {
         name: 'client',
         command: 'bun run dev',
         cwd: 'packages/client',
         prefixColor: 'green',
      },
   ],
   {
      killOthers: ['failure'],
      restartTries: 3,
   }
);
