import { League } from "./api/models/League"

type TierInformation = {
  minPoint: number
  maxPoint?: number
  nextLeague?: League
  nextTier?: Tier
}

export enum Tier {
  ONE = 1,
  TWO = 2,
  THREE = 3,
}

type LeagueDetails = Record<Tier, TierInformation>

export const leagueInformations: Record<League, LeagueDetails> = {
  aspirant: {
    3: {
      minPoint: 0,
      maxPoint: 1027,
      nextLeague: League.ASPIRANT,
      nextTier: 2,
    },
    2: {
      minPoint: 1028,
      maxPoint: 1114,
      nextLeague: League.ASPIRANT,
      nextTier: 1,
    },
    1: {
      minPoint: 1115,
      maxPoint: 1165,
      nextLeague: League.BRONZE,
      nextTier: 3,
    },
  },
  bronze: {
    3: {
      minPoint: 1166,
      maxPoint: 1241,
      nextLeague: League.BRONZE,
      nextTier: 2,
    },
    2: {
      minPoint: 1242,
      maxPoint: 1279,
      nextLeague: League.BRONZE,
      nextTier: 1,
    },
    1: {
      minPoint: 1280,
      maxPoint: 1331,
      nextLeague: League.SILVER,
      nextTier: 3,
    },
  },
  silver: {
    3: {
      minPoint: 1332,
      maxPoint: 1372,
      nextLeague: League.SILVER,
      nextTier: 2,
    },
    2: {
      minPoint: 1373,
      maxPoint: 1408,
      nextLeague: League.SILVER,
      nextTier: 1,
    },
    1: {
      minPoint: 1409,
      maxPoint: 1440,
      nextLeague: League.GOLD,
      nextTier: 3,
    },
  },
  gold: {
    3: {
      minPoint: 1441,
      maxPoint: 1470,
      nextLeague: League.GOLD,
      nextTier: 2,
    },
    2: {
      minPoint: 1471,
      maxPoint: 1499,
      nextLeague: League.GOLD,
      nextTier: 1,
    },
    1: {
      minPoint: 1500,
      maxPoint: 1528,
      nextLeague: League.PLATINUM,
      nextTier: 3,
    },
  },
  platinum: {
    3: {
      minPoint: 1529,
      maxPoint: 1562,
      nextLeague: League.PLATINUM,
      nextTier: 2,
    },
    2: {
      minPoint: 1563,
      maxPoint: 1598,
      nextLeague: League.PLATINUM,
      nextTier: 1,
    },
    1: {
      minPoint: 1599,
      maxPoint: 1639,
      nextLeague: League.DIAMOND,
      nextTier: 3,
    },
  },
  diamond: {
    3: {
      minPoint: 1640,
      maxPoint: 1688,
      nextLeague: League.DIAMOND,
      nextTier: 2,
    },
    2: {
      minPoint: 1689,
      maxPoint: 1757,
      nextLeague: League.DIAMOND,
      nextTier: 1,
    },
    1: {
      minPoint: 1758,
      maxPoint: 1884,
      nextLeague: League.MASTER,
      nextTier: 3,
    },
  },
  master: {
    3: {
      minPoint: 1885,
      maxPoint: 1935,
      nextLeague: League.MASTER,
      nextTier: 2,
    },
    2: {
      minPoint: 1936,
      maxPoint: 2021,
      nextLeague: League.MASTER,
      nextTier: 1,
    },
    1: {
      minPoint: 2022,
    },
  },
}
