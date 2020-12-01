export default class Pagination<T> {
     pageIndex: number
     pageSize: number
     totalCount: number
     paginatedData: Array<T>

    constructor(pageIndex: number, pageSize: number, totalCount: number, paginatedData: Array<T>) {
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.totalCount = totalCount;
        this.paginatedData = paginatedData;
    }
}