import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import '@shared/infra/typeorm/index';
import '@shared/container';

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333, () => {
  console.log('Server on port: 3333');
});
