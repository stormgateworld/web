import { League } from "./api/models/League"

type TierInformation = {
  minPoint: number
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
      nextLeague: League.ASPIRANT,
      nextTier: 2,
    },
    2: {
      minPoint: 1028,
      nextLeague: League.ASPIRANT,
      nextTier: 1,
    },
    1: {
      minPoint: 1115,
      nextLeague: League.BRONZE,
      nextTier: 3,
    },
  },
  bronze: {
    3: {
      minPoint: 1166,
      nextLeague: League.BRONZE,
      nextTier: 2,
    },
    2: {
      minPoint: 1242,
      nextLeague: League.BRONZE,
      nextTier: 1,
    },
    1: {
      minPoint: 1280,
      nextLeague: League.SILVER,
      nextTier: 3,
    },
  },
  silver: {
    3: {
      minPoint: 1332,
      nextLeague: League.SILVER,
      nextTier: 2,
    },
    2: {
      minPoint: 1373,
      nextLeague: League.SILVER,
      nextTier: 1,
    },
    1: {
      minPoint: 1409,
      nextLeague: League.GOLD,
      nextTier: 3,
    },
  },
  gold: {
    3: {
      minPoint: 1441,
      nextLeague: League.GOLD,
      nextTier: 2,
    },
    2: {
      minPoint: 1471,
      nextLeague: League.GOLD,
      nextTier: 1,
    },
    1: {
      minPoint: 1500,
      nextLeague: League.PLATINUM,
      nextTier: 3,
    },
  },
  platinum: {
    3: {
      minPoint: 1529,
      nextLeague: League.PLATINUM,
      nextTier: 2,
    },
    2: {
      minPoint: 1563,
      nextLeague: League.PLATINUM,
      nextTier: 1,
    },
    1: {
      minPoint: 1599,
      nextLeague: League.DIAMOND,
      nextTier: 3,
    },
  },
  diamond: {
    3: {
      minPoint: 1640,
      nextLeague: League.DIAMOND,
      nextTier: 2,
    },
    2: {
      minPoint: 1689,
      nextLeague: League.DIAMOND,
      nextTier: 1,
    },
    1: {
      minPoint: 1758,
      nextLeague: League.MASTER,
      nextTier: 3,
    },
  },
  master: {
    3: {
      minPoint: 1885,
      nextLeague: League.MASTER,
      nextTier: 2,
    },
    2: {
      minPoint: 1936,
      nextLeague: League.MASTER,
      nextTier: 1,
    },
    1: {
      minPoint: 2022,
    },
  },
}
