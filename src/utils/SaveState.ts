import { Time } from '../models/time';
import { useMarketStore } from '../stores/market';
import { useWalletStore } from '../stores/wallet';

export const LOCAL_STORAGE_KEY = 'marketsim-data';
const DOWNLOAD_FILE_NAME = 'save.json';

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

  private loadDataFromStores() {
    this.data.globalTime = new Time();
    this.data.wallet.money = this.walletStore.money;
    this.data.wallet.ownedStocks = this.walletStore.ownedStocks;
    this.data.market.stocks = this.marketStore.stocks;
  }

  private loadStoresFromData() {
    Time.SetTime(this.data.globalTime);
    this.walletStore.money = this.data.wallet.money;
    this.walletStore.ownedStocks = this.data.wallet.ownedStocks;
    this.marketStore.stocks = this.data.market.stocks;
  }

  loadFromLocalStorage(): boolean {
    const str = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!str) {
      return false;
    }
    try {
      this.data = JSON.parse(str);
    } catch (err) {
      return false;
    }
    this.loadStoresFromData();
    return true;
  }

  saveToLocalStorage() {
    this.loadDataFromStores();
    const str = JSON.stringify(this.data);
    localStorage.setItem(LOCAL_STORAGE_KEY, str);
  }

  loadFromFile(data: any): boolean {
    try {
      this.data = data;
    } catch (err) {
      return false;
    }
    this.loadStoresFromData();
    return true;
  }

  saveToFile() {
    const str =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(this.data, null, 2));
    const a = document.createElement('a');
    a.setAttribute('href', str);
    a.setAttribute('download', DOWNLOAD_FILE_NAME);
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}
