export enum Growth {
  DECREASE_MAJOR,
  DECREASE,
  DECREASE_MINOR,
  INCREASE_MINOR,
  INCREASE,
  INCREASE_MAJOR,
}

export interface Company {
  readonly name: string;
  readonly abbr: string;
  readonly volatility: number; // number 0-1 which represents the likelyhood for growth to change
  readonly totalShares: number;
}

export interface Stock {
  readonly company: Company;
  historic: StockPrice[];
  availableShares: number;
  currentPrice: number;
  growth: Growth;
}

export interface StockPrice {
  time: Date;
  price: number;
}
