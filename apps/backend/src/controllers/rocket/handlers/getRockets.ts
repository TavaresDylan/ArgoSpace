import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getRockets = async (_req: Request, res: Response) => {
  try {
    const rockets = await prisma.rocket.findMany();
    res.status(200).json(rockets);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export default getRockets;
