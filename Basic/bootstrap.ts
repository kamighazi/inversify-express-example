// general imports
import { Controller, InversifyExpressServer } from 'inversify-express-utils';
import { Kernel } from 'inversify';
import * as bodyParser from 'body-parser';

// imports for the kernel
import { HomeController } from './controller/home';
import { UserController } from './controller/user';
import { UserService } from './service/user';

import 'reflect-metadata';

// load everything needed to the kernel
let kernel = new Kernel();
kernel.bind<Controller>('Controller').to(HomeController).whenTargetNamed('HomeController');
kernel.bind<Controller>('Controller').to(UserController).whenTargetNamed('UserController');
kernel.bind<UserService>('UserService').to(UserService);

// start the server
let server = new InversifyExpressServer(kernel);
server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});
let app = server.build();
app.listen(3000);
console.log('Server started on port 3000 :)');
