import { PrismaClient } from '@prisma/client';

export async function RocketSeed(prisma: PrismaClient) {
  await prisma.rocket.create({
    data: {
      name: 'Falcon 1',
      description:
        'The Falcon 1 was an expendable launch system privately developed and manufactured by SpaceX during 2006-2009. On 28 September 2008, Falcon 1 became the first privately-developed liquid-fuel launch vehicle to go into orbit around the Earth.',
      imgUrl: 'https://imgur.com/DaCfMsj.jpg',
      isActive: false,
      firstFlight: new Date('2006-03-24'),
      height: 22.25,
      diameter: 1.68,
      mass: 30146,
      company: 'SpaceX',
      country: 'Republic of the Marshall Islands',
    },
  });
  await prisma.rocket.create({
    data: {
      name: 'Falcon 9',
      description:
        'Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit.',
      imgUrl: 'https://farm1.staticflickr.com/929/28787338307_3453a11a77_b.jpg',
      isActive: true,
      firstFlight: new Date('2010-06-04'),
      height: 70,
      diameter: 3.7,
      mass: 549054,
      company: 'SpaceX',
      country: 'United States',
      totalLandings: 282,
      totalLaunches: 324,
      totalReflights: 255,
    },
  });
  await prisma.rocket.create({
    data: {
      name: 'Falcon Heavy',
      description:
        'With the ability to lift into orbit over 54 metric tons (119,000 lb)--a mass equivalent to a 737 jetliner loaded with passengers, crew, luggage and fuel--Falcon Heavy can lift more than twice the payload of the next closest operational vehicle, the Delta IV Heavy, at one-third the cost.',
      imgUrl:
        'https://farm5.staticflickr.com/4599/38583829295_581f34dd84_b.jpg',
      isActive: true,
      firstFlight: new Date('2018-02-06'),
      height: 70,
      diameter: 12.2,
      mass: 1420788,
      company: 'SpaceX',
      country: 'United States',
      totalLandings: 17,
      totalLaunches: 9,
      totalReflights: 14,
    },
  });
  await prisma.rocket.create({
    data: {
      name: 'Starship',
      description:
        'Starship and Super Heavy Rocket represent a fully reusable transportation system designed to service all Earth orbit needs as well as the Moon and Mars. This two-stage vehicle — composed of the Super Heavy rocket (booster) and Starship (ship) — will eventually replace Falcon 9, Falcon Heavy and Dragon.',
      imgUrl:
        'https://live.staticflickr.com/65535/48954138962_ee541e6755_b.jpg',
      isActive: false,
      firstFlight: new Date('2021-12-01'),
      height: 118,
      diameter: 9,
      mass: 1335000,
      company: 'SpaceX',
      country: 'United States',
    },
  });
}
