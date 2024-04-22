import { Response, Request } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getRocketById = async (req: Request, res: Response) => {
  try {
    const rockets = await prisma.rocket.findUnique({
      where: { id: req.params.id },
      include: {
        imageUrls: true,
      },
    });
    res.status(200).json(
      rockets as Prisma.RocketGetPayload<{
        include: {
          imageUrls: true;
        };
      }>
    );
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export default getRocketById;
