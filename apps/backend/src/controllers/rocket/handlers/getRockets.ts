import { Response, Request } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const getRockets = async (_req: Request, res: Response) => {
  try {
    const rockets = await prisma.rocket.findMany({
      include: {
        imageUrls: true,
      },
    });
    res.status(200).json(
      rockets as Prisma.RocketGetPayload<{
        include: {
          imageUrls: true;
        };
      }>[]
    );
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export default getRockets;
