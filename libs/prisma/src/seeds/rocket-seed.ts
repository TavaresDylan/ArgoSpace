import { PrismaClient } from '@prisma/client';

export async function RocketSeed(prisma: PrismaClient) {
  await prisma.rocket.upsert({
    where: {
      id: '1',
    },
    update: {},
    create: {
      id: '1',
      name: 'Falcon 1',
      description:
        'The Falcon 1 was an expendable launch system privately developed and manufactured by SpaceX during 2006-2009. On 28 September 2008, Falcon 1 became the first privately-developed liquid-fuel launch vehicle to go into orbit around the Earth.',
      imageUrls: {
        create: [
          {
            url: 'https://imgur.com/DaCfMsj.jpg',
          },
          {
            url: 'https://imgur.com/azYafd8.jpg',
          },
        ],
      },
      isActive: false,
      firstFlight: new Date('2006-03-24'),
      height: 22.25,
      diameter: 1.68,
      mass: 30146,
      company: 'SpaceX',
      country: 'Republic of the Marshall Islands',
    },
  });
  await prisma.rocket.upsert({
    where: {
      id: '2',
    },
    update: {},
    create: {
      id: '2',
      name: 'Falcon 9',
      description:
        'Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit.',
      imageUrls: {
        create: [
          {
            url: 'https://farm1.staticflickr.com/929/28787338307_3453a11a77_b.jpg',
          },
          {
            url: 'https://farm4.staticflickr.com/3955/32915197674_eee74d81bb_b.jpg',
          },
          {
            url: 'https://farm1.staticflickr.com/293/32312415025_6841e30bf1_b.jpg',
          },
          {
            url: 'https://farm1.staticflickr.com/623/23660653516_5b6cb301d1_b.jpg',
          },
          {
            url: 'https://farm1.staticflickr.com/745/32394687645_a9c54a34ef_b.jpg',
          },
          {
            url: 'https://farm6.staticflickr.com/5518/31579784413_d853331601_b.jpg',
          },
        ],
      },
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
  await prisma.rocket.upsert({
    where: {
      id: '3',
    },
    update: {},
    create: {
      id: '3',
      name: 'Falcon Heavy',
      description:
        'With the ability to lift into orbit over 54 metric tons (119,000 lb)--a mass equivalent to a 737 jetliner loaded with passengers, crew, luggage and fuel--Falcon Heavy can lift more than twice the payload of the next closest operational vehicle, the Delta IV Heavy, at one-third the cost.',
      imageUrls: {
        create: [
          {
            url: 'https://farm5.staticflickr.com/4599/38583829295_581f34dd84_b.jpg',
          },
          {
            url: 'https://farm5.staticflickr.com/4645/38583830575_3f0f7215e6_b.jpg',
          },
          {
            url: 'https://farm5.staticflickr.com/4696/40126460511_b15bf84c85_b.jpg',
          },
          {
            url: 'https://farm5.staticflickr.com/4711/40126461411_aabc643fd8_b.jpg',
          },
        ],
      },
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
  await prisma.rocket.upsert({
    where: {
      id: '4',
    },
    update: {},
    create: {
      id: '4',
      name: 'Starship',
      description:
        'Starship and Super Heavy Rocket represent a fully reusable transportation system designed to service all Earth orbit needs as well as the Moon and Mars. This two-stage vehicle — composed of the Super Heavy rocket (booster) and Starship (ship) — will eventually replace Falcon 9, Falcon Heavy and Dragon.',
      imageUrls: {
        create: [
          {
            url: 'https://live.staticflickr.com/65535/48954138962_ee541e6755_b.jpg',
          },
          {
            url: 'https://live.staticflickr.com/65535/48953946911_e60c5bcc5c_b.jpg',
          },
          {
            url: 'https://live.staticflickr.com/65535/48954138922_9c42173f08_b.jpg',
          },
          {
            url: 'https://live.staticflickr.com/65535/48953947006_313f01ec93_b.jpg',
          },
        ],
      },
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
