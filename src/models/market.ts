export enum Growth {
  DECREASE_MAJOR,
  DECREASE,
  DECREASE_MINOR,
  INCREASE_MINOR,
  INCREASE,
  INCREASE_MAJOR,
}

export const GROWTHS: Growth[] = [
  Growth.DECREASE_MAJOR,
  Growth.DECREASE,
  Growth.DECREASE_MINOR,
  Growth.INCREASE_MINOR,
  Growth.INCREASE,
  Growth.INCREASE_MAJOR,
];

export interface Company {
  readonly name: string;
  readonly description: string;
  readonly abbr: string;
  readonly volatility: number; // number 0-1 which represents the likelyhood for growth to change
  readonly totalShares: number;
}

export interface Stock {
  readonly company: Company;
  historic: number[];
  availableShares: number;
  currentPrice: number;
  growth: Growth;
}
