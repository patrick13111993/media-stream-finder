import { WatchProvider } from "../watch-provider.model"

export class WatchProviderList {
    constructor(
        public rent: WatchProvider[],
        public buy: WatchProvider[],
        public flatrate: WatchProvider[]
    ) {}
}