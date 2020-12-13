export default class Paginated<T> {
    page: number;
    pageSize: number;
    totalItems: number;
    results: T[];

    constructor(results: T[], page: number, pageSize: number, totalItems: number) {
        this.page = page;
        this.pageSize = pageSize;
        this.totalItems = totalItems;
        this.results = results;
    }

    get totalPages(): number {
        return Math.ceil(this.totalItems / this.pageSize);
    }

    static of<T>(results: T[], page: number, pageSize: number, totalItems: number): Paginated<T> {
        return new Paginated<T>(results, page, pageSize, totalItems);
    }

    static buildPage<T>(results: T[], page: number, pageSize: number): Paginated<T> {
        const currentIndex = (page - 1) * pageSize;
        const selectedPage = results.slice(currentIndex, currentIndex + pageSize);
        return Paginated.of(selectedPage, page, pageSize, results.length);
    }
}
