import epr from 'express-promise-router';
import routeErrorHandler from './error/handlers/routeErrorHandler';
import notFoundErrorHandler from './error/handlers/notFoundErrorHandler';
import productApi from './product';

const router = epr();

router.use('/product', productApi);

router.use(routeErrorHandler);
router.use(notFoundErrorHandler);

export default router;
