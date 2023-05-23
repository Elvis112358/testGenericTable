# TestGenericTable

Implementation of @elvis11235/ngx-generic-table library. Showcase example on how this strongly typed generic table library can be used
![image](https://github.com/Elvis112358/testGenericTable/assets/89360370/dbda4eda-7128-4ca6-8b43-dc095d2a3c0a)

## Strongly Typed
If a developer tries to access or modify properties that are not defined in the provided data class, the compiler or linter will raise an error, indicating that the property does not exist.

![strongly_type_class_example](https://github.com/Elvis112358/testGenericTable/assets/89360370/7b11243a-f328-4b18-9b86-27b034920748)
![image](https://github.com/Elvis112358/testGenericTable/assets/89360370/91d7d9d3-90de-41fb-a186-ef1a7618319e)

## How to start

Run npm install, to locally install all dependencies required.
@elvis11235/ngx-generic-table depends on angular-material(filter section), angular-animations, etc. 
Here is the list of all peerdependencies:
    "@angular/animations": "^15.0.2",
    "@angular/cdk": "^15.2.5",
    "@angular/common": "^15.0.2",
    "@angular/compiler": "^15.0.2",
    "@angular/core": "^15.0.2",
    "@angular/forms": "^15.0.2",
    "@angular/material": "^15.2.5",
    "@angular/platform-browser": "^15.0.2",
    "@angular/platform-browser-dynamic": "^15.0.2",
    "@angular/router": "^15.0.2",
    "rxjs": "~7.5.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.11.4"

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Fake-JSON backend server

Install fake json server : npm install -g json-server
Run `npm run start-server` for a fake-json backend server. 

## Useage od @elvis11235/ngx-generic-table
### Exposed enums, classes and interfaces:

export class TableDataQuery {
  currentPage: number | undefined;
  pageSize: number | undefined;
  sorting: Sorting;
  filtering: Filter[];
  constructor(
    currentPage: number | undefined = undefined,
    pageSize: number | undefined = 1,
    sorting: Sorting = new Sorting(),
    filtering: Filter[] = [new Filter()]
  ) {
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.sorting = sorting;
    this.filtering = filtering;
  }

  setPageSize(pageSize?: number | undefined) {
    if (pageSize) this.pageSize = pageSize;
  }
  setCurrentPage(currentPage: number | undefined) {
    if (currentPage) this.currentPage = currentPage;
  }
  setSorting(sortData: Sorting) {
    if (sortData) this.sorting = sortData;
  }
  setFiltering(filter: Filter) {
    let existingFilter = this.filtering.find((f) => f.field === filter.field);
    if (existingFilter) {
      if (filter.value !== '') {
        existingFilter.value = filter.value;
      } else {
        this.filtering = [
          ...this.filtering.filter((value) => value.field !== filter.field),
        ];
      }
    } else if (
      filter.value !== '' &&
      filter.value !== undefined &&
      filter.field !== undefined
    ) {
      this.filtering.push(filter);
    }
  }
}

export class Sorting {
  column: string | undefined;
  sortDirection!: SortingType | undefined;

  constructor(
    column: string | undefined = undefined,
    sortDirection: SortingType | undefined = undefined
  ) {
    this.column = column;
    this.sortDirection = sortDirection;
  }
}

export class Filter {
  field: string | undefined;
  value: string | string[] | number | Date | Date[] | undefined;
  filterOperation: FilterOperation| FilterOperation[] | undefined;
  constructor(
    field: string | undefined = undefined,
    value: string | number | Date | Date[] | undefined = undefined,
    filterOperation: FilterOperation | FilterOperation[] | undefined = undefined
  ) {
    this.field = field;
    this.value = value;
    this.filterOperation = filterOperation;
  }
}

export class SelectFilterOptions {
    id?: string | number;
    text?: string | number;
    constructor(id: string | number, text: string | number ) {
        this.id = id;
        this.text = text;
    }
}


export enum FilterDataType {
  TEXT = 'text',
  NUMBER = 'number',
  DATE = 'DateTime',
  SELECT = 'select'
}



export enum FixedPosition {
  LEFT,
  RIGHT,
}

export enum Template {
  BODY,
  HEAD,
  NO_RESULT
}

export enum PagingType {
  SERVER_SIDE,
  CLIENT_SIDE,
}

export enum RequestMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
}

### When implementing app-generic-table you provide:

#### 1. data source (data) which is generic. If you define type class for your provided data, that will activate strongly typed feature, which will increase type safety while using properties of data as source for table columns data. (Check test-table-example.component.html for implementation)
#### 2. Configuring the Table. 
[totalElements] : number - provide number of all elmements (data.length) of the data retrieved from server (needed when cliend side sorting and paging option enabled)
[pageSize] : number - elements per page 
[pagingType] : PagingType - SERVER_SIDE | CLIENT_SIDE : PagingType  - this generic table supports both client and server side handled paging, sorting, and for some data types filter(filtering covered on server side always)
#### 3.Handling Events
pageChange: Triggered when the page is changed.
sorting: Triggered when sorting is applied.
filtering: Triggered when filtering is applied.

For more details check test-table-example.component.ts


