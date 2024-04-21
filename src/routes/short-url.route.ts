import { NextFunction, Request, Response } from 'express';
import express from 'express';
import { shortUrlService } from '../services';
import { isUrl } from '../utils';

const router = express.Router();

router.post(
  '/shortenUrl',
  async (req: Request, res: Response, next: NextFunction) => {
    const { longUrl } = req.body;
    if (!longUrl || typeof longUrl !== 'string' || !isUrl(longUrl)) {
      return res.status(400).send('longUrl is missed or invalid');
    }

    try {
      const shortUrl = await shortUrlService.shortenUrl(longUrl);
      return res.status(200).send({ data: shortUrl });
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  '/:shortUrl',
  async (req: Request, res: Response, next: NextFunction) => {
    const { shortUrl } = req.params;

    try {
      const longUrl = await shortUrlService.getLongUrl(shortUrl);

      if (!longUrl) {
        return res.status(404);
      }

      return res.status(302).redirect(longUrl);
    } catch (err) {
      next(err);
    }
  },
);

export default router;
