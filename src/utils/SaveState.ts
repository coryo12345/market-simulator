import { Time } from '../models/time';
import { useMarketStore } from '../stores/market';
import { useWalletStore } from '../stores/wallet';

const LOCAL_STORAGE_KEY = 'marketsim-data';

export interface SaveStateData {
  wallet: Pick<ReturnType<typeof useWalletStore>, 'money' | 'ownedStocks'>;
  market: Pick<ReturnType<typeof useMarketStore>, 'stocks'>;
  globalTime: Time;
}

export class SaveState {
  private data: SaveStateData;

  private walletStore: ReturnType<typeof useWalletStore>;
  private marketStore: ReturnType<typeof useMarketStore>;

  constructor(
    walletStore: ReturnType<typeof useWalletStore>,
    marketStore: ReturnType<typeof useMarketStore>,
  ) {
    this.walletStore = walletStore;
    this.marketStore = marketStore;
    this.data = {
      wallet: {
        money: 0,
        ownedStocks: [],
      },
      market: {
        stocks: [],
      },
      globalTime: new Time(),
    };
  }

  loadFromLocalStorage(): boolean {
    const str = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!str) {
      return false;
    }
    this.data = JSON.parse(str);

    Time.SetTime(this.data.globalTime);
    this.walletStore.money = this.data.wallet.money;
    this.walletStore.ownedStocks = this.data.wallet.ownedStocks;
    this.marketStore.stocks = this.data.market.stocks;

    return true;
  }

  saveToLocalStorage() {
    this.data.globalTime = new Time();
    this.data.wallet.money = this.walletStore.money;
    this.data.wallet.ownedStocks = this.walletStore.ownedStocks;
    this.data.market.stocks = this.marketStore.stocks;
    const str = JSON.stringify(this.data);
    localStorage.setItem(LOCAL_STORAGE_KEY, str);
  }

  // loadFromFile() {}
  // saveToFile() {}
}
