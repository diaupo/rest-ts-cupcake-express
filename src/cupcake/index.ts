import { Router } from 'express';
import { listAction, listOneAction, removeAction, updateAction , upsertAction} from './controller.js';
//import { listAction } from './controller.js';

const cupcakeRouter = Router();

// router.get('/', (request, response) => {
//         response.send(data);
//        });    
cupcakeRouter.get('/', listAction);
cupcakeRouter.delete('/:cupcakeId', removeAction);
cupcakeRouter.get('/:cupcakeId', listOneAction);
cupcakeRouter.put('/:cupcakeId', updateAction);
cupcakeRouter.post('/', upsertAction);

export { cupcakeRouter };