export default class Pagination<T> {
     pageIndex: number
     pageSize: number
     count: number
     paginatedData: Array<T>

    constructor(pageIndex: number, pageSize: number, count: number, paginatedData: Array<T>) {
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.count = count;
        this.paginatedData = paginatedData;
    }
}