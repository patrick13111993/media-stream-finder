export class MovieFull {
    constructor(
        public movieID: number,
        public title: string,
        public tagline: string,
        public thumbPath: string,
        public backdrop_path: string,
        public overview: string,
        public release_date: string,
        public revenue: number,
        public runtime: number,
        public vote_average: number,
        public adult: boolean
    ) {}
}