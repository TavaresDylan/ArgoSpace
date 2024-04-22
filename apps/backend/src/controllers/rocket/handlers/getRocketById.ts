import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getRocketById = async (req: Request, res: Response) => {
  try {
    const rockets = await prisma.rocket.findUnique({
      where: { id: req.params.id },
    });
    res.status(200).json(rockets);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export default getRocketById;
