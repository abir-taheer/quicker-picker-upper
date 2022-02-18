import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { Router } from 'express';

const sessionSecret =
  process.env.SESSION_SECRET || 'some_semi_permanent_secret';

const router = Router();

router.use(cookieParser(sessionSecret));

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

export default router;
