import promiseRouter from 'express-promise-router';
import * as productController from './controller';
import ensurePaginatedRequestFactory from '../../middlewares/ensurePaginatedRequestFactory';
import ensureNoValidationError from '../../middlewares/ensureNoValidationError';
import { query } from 'express-validator';

const router = promiseRouter();

router.get('/',
    ensurePaginatedRequestFactory(),
    ensureNoValidationError,
    productController.listProducts);

router.get('/search',
    ensurePaginatedRequestFactory(),
    query('keyword').default(''),
    ensureNoValidationError,
    productController.searchProducts);

export default router;
