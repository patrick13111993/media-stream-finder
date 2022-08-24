import { WatchProviderList } from "../watch-provider-list/watch-provider-list.model"
import { WatchProvider } from "../watch-provider.model"

export class WatchProviders {

    imageUrl: string = "https://image.tmdb.org/t/p/original";

    constructor(
        public rent: {
            display_priority: number,
            logo_path: string,
            provider_id: number,
            provider_name: string
        }[],
        public buy: {
            display_priority: number,
            logo_path: string,
            provider_id: number,
            provider_name: string
        }[],
        public flatrate: {
            display_priority: number,
            logo_path: string,
            provider_id: number,
            provider_name: string
        }[]
    ) { }

    get Providers() {
        let rentList: WatchProvider[] = [];
        let buyList: WatchProvider[] = [];
        let flatrateList: WatchProvider[] = [];
        if(this.rent) {
            for (let watchProvider of this.rent) {
                rentList.push(new WatchProvider(watchProvider.display_priority, this.imageUrl + watchProvider.logo_path, watchProvider.provider_id, watchProvider.provider_name));
            }
        }
        if(this.buy) {
            for (let watchProvider of this.buy) {
                buyList.push(new WatchProvider(watchProvider.display_priority, this.imageUrl + watchProvider.logo_path, watchProvider.provider_id, watchProvider.provider_name));
            }
        }
        if(this.flatrate) {
            for (let watchProvider of this.flatrate) {
                flatrateList.push(new WatchProvider(watchProvider.display_priority, this.imageUrl + watchProvider.logo_path, watchProvider.provider_id, watchProvider.provider_name));
            }
        }
        return new WatchProviderList(rentList, buyList, flatrateList);
    }
}