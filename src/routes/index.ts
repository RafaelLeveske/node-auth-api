import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({
    Teste: 'teste',
  });
});

export default routes;
