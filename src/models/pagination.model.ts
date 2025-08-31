
interface Meta {
    total: number;
    page: number;
    limit: number;
    pages: number;
    prev: number | null;
    next: number | null;
}

export class Pagination<T> {
    [key: string]: T[] | Meta;
    meta: Meta

    constructor(data: T[], meta: Meta, className: string = "response") {
        this[className] = data;
        this.meta = meta;
    }
}