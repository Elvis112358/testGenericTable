import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Filter, RequestMethod, TableDataQuery } from '@elvis11235/ngx-generic-table';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(protected api: ApiService) {}

  url = 'http://localhost:3000/';
  body = { observe: 'response' };

  async getUsers(queryData: TableDataQuery): Promise<any> {
    let url = this.url + 'users';

    if (queryData.currentPage && queryData.pageSize) {
      url =
        url + `?_page=${queryData.currentPage}&_limit=${queryData.pageSize}`;
    }

    if (
      queryData.currentPage &&
      queryData.pageSize &&
      queryData.sorting.column &&
      queryData.sorting.sortDirection
    ) {
      url =
        url +
        `&_sort=${queryData.sorting.column}&_order=${queryData.sorting.sortDirection}`;
    }

    if (queryData.currentPage && queryData.pageSize && queryData.filtering) {
      let filterParam = this.prepeareFilterForFakeJsonServerFiltering(queryData.filtering);

      if (filterParam !== '') {
        url += `&${filterParam}`;
      }
    }
    return await this.api.sendRequest(RequestMethod.Get, url, this.body);
  }

  private isDateRangeValue(
    filterValue: string | string[] | number | undefined | Date | Date[]
  ): boolean {
    let test =
      filterValue instanceof Date ||
      (Array.isArray(filterValue) && filterValue.length > 0);
    return test;
  }

  private prepeareFilterForFakeJsonServerFiltering(
    filteringParams: Filter[]
  ): string {
    let filterParam: string = filteringParams
      .filter(
        (param) =>
          param.field !== undefined && !this.isDateRangeValue(param.value)
      )
      .map((param) => `${param.field}=${param.value}`)
      .join('&');
    const filterParamDate: string = filteringParams
      .filter((param) => {
        return param.field !== undefined && this.isDateRangeValue(param.value);
      })
      .map((param) => {
        if (
          Array.isArray(param.filterOperation) &&
          Array.isArray(param.value)
        ) {
          return `${param.field}${param.filterOperation[0]}=${param.value[0]}&${param.field}${param.filterOperation[1]}=${param.value[1]}`;
        }
        return `${param.field}=${param.value}`;
      })
      .join('&');
    if (filterParamDate) {
      if (filterParam) {
        filterParam = filterParam + '&' + filterParamDate;
      } else filterParam = filterParam + filterParamDate;
    }
    return filterParam;
  }
}
