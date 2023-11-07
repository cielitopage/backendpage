import { envs } from './config/envs';
import { MongoStringDB } from './data';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';




(async()=> {
  main();
})();


async function main() {

  await MongoStringDB.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DBNAME,
  });


  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}