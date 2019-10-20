export interface Imovie {
    guid: string;
    title: string;
    year: number;
    image: string;
    rated?: number;
    released?: Date;
    runtime?: number;
    genre?: string[];
    director?: string;
    write?: string;
    actors?: string[];
    plot?: string;
    language?: string;
    country?: string;
    awards?: string[];
}
