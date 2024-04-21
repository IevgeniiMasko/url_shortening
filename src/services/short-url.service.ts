import * as crypto from 'crypto';
import { prisma } from '../prisma';

const generateShortUrl = (longUrl: string): string => {
  const md5Hash = crypto.createHash('md5').update(longUrl).digest('hex');
  const shortUrl = md5Hash.slice(0, 7);
  return shortUrl;
};

export const shortenUrl = async (longUrl: string) => {
  const shortUrl = generateShortUrl(longUrl);

  const longUrlExists = await getLongUrl(shortUrl);
  if (longUrlExists) {
    return shortUrl;
  }

  await prisma.shortUrl.create({
    data: {
      shortUrl,
      longUrl,
    },
  });

  return shortUrl;
};

export const getLongUrl = async (shortUrl: string) => {
  const longUrlRecord = await prisma.shortUrl.findUnique({
    where: { shortUrl },
  });
  return longUrlRecord?.longUrl;
};
