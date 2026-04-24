import { Router, type IRouter } from "express";
import healthRouter from "./health";
import productsRouter from "./products";
import subscribersRouter from "./subscribers";
import siteContentRouter from "./site-content";
import reviewsRouter from "./reviews";

const router: IRouter = Router();

router.use(healthRouter);
router.use(productsRouter);
router.use(subscribersRouter);
router.use(siteContentRouter);
router.use(reviewsRouter);

export default router;
