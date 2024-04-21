import { PrismaClient } from '@prisma/client';

import { RocketSeed } from './seeds/rocket-seed';

const prisma = new PrismaClient();
async function main() {
  await RocketSeed(prisma)
    .then(() => console.log('✅ Rocket seed completed 🌱'))
    .catch((err) => {
      console.error(err);
    });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
