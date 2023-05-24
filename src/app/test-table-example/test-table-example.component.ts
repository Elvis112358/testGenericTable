import { Component, OnInit } from '@angular/core';
import { Filter, FilterDataType, FixedPosition, PagingType, SelectFilterOptions, Sorting, TableDataQuery, Template } from '@elvis11235/ngx-generic-table';
import { User } from '../interfaces/user.interface';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-test-table-example',
  templateUrl: './test-table-example.component.html',
  styleUrls: ['./test-table-example.component.scss']
})
export class TestTableExampleComponent implements OnInit {
  Template = Template;
  users: User[] = [];
  // total Number of elements retrieved from BE SIDE
  // used to calculate visible pages for client side paging
  records: number = 0;
  // SET SERVER OR CLIENT SIDE PAGINATION SORTING AND FILTERING
  pagingType: PagingType = PagingType.SERVER_SIDE;
  // SET PAGE SIZE FOR PAGINTAION
  pageSize: number = 10;

  readonly FilterDataType = FilterDataType;
  readonly FixedPosition = FixedPosition;
  filterColumn: string | undefined = undefined;
  filterValue: string | undefined = undefined;

  queryOptionsData: TableDataQuery = new TableDataQuery();
  showUserInfo: boolean = true;
  switch: Array<boolean> = [];
  // for testing select filter values
  departments: Array<SelectFilterOptions> = [
    new SelectFilterOptions('dev', 'Dev'),
    new SelectFilterOptions('qa', 'QA'),
    new SelectFilterOptions('hr', 'HR'),
    new SelectFilterOptions('pm', 'PM'),
    new SelectFilterOptions('marketing', 'Marketing'),
    new SelectFilterOptions('sales', 'Sales'),
    new SelectFilterOptions('nonExisting', 'NonExisting'),
  ];

  constructor(private usersService: UsersService) {}

  async ngOnInit(): Promise<void> {
    this.queryOptionsData.pageSize = this.pageSize;
    await this.getInitalUsers();
    this.records = this.users.length;
    this.resetSwitchState();
  }

  seePosition(user: User) {
    this.switch[this.users.indexOf(user)] =
      !this.switch[this.users.indexOf(user)];
  }

  resetSwitchState(): void {
    this.switch = [];
    for (let index = 0; index < this.pageSize; index++) {
      this.switch.push(false);
    }
  }

  async getInitalUsers(pageNumber?: number, pageSize?: number): Promise<any> {
    this.queryOptionsData.setPageSize(pageSize);
    this.queryOptionsData.setCurrentPage(pageNumber);
    await this.getUsersData(this.queryOptionsData);
    if (this.pagingType === PagingType.SERVER_SIDE) {
      // apply paging for first page
      await this.pageChanged(1);
    }
  }

  //in case of server side paging we emit event on pageChanged
  async pageChanged(currentPage: number): Promise<void> {
    this.queryOptionsData.setCurrentPage(currentPage);
    this.getUsersData(this.queryOptionsData);
  }

  serverHandledSorting(sortData: Sorting) {
    this.queryOptionsData.setSorting(sortData);
    this.getUsersData(this.queryOptionsData);
  }

  serverHendledFiltering(filterData: Filter) {
    this.queryOptionsData.setCurrentPage(1);
    if (filterData && Array.isArray(filterData.value)) {
      const tempArray = filterData.value.map((date) => {
        if (date instanceof Date && !isNaN(date.getTime())) {
          return date.toISOString();
        } else return date.toString();
      });
      filterData.value = tempArray;
    }
    this.queryOptionsData.setFiltering(filterData);
    this.getUsersData(this.queryOptionsData);
  }

  private async getUsersData(queryData: TableDataQuery): Promise<any> {
    return new Promise((resolve, reject) => {
      this.usersService
        .getUsers(queryData)
        .then((response) => {
          if (response) {
            this.users = response.body;
            if (response.headers.get('X-Total-Count'))
              this.records = response.headers.get('X-Total-Count');
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  rtnImageSrc(name: string): string {
    const images = [
      'assets/andale.png',
      'assets/ilma.png',
      'assets/dzanke.png',
      'assets/elva.png'
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];

  }

  calculateDate(startDate: Date, endDate: Date): number {
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const diffInMilliseconds = Math.abs(
      new Date(endDate).getTime() - new Date(startDate)?.getTime()
    );
    let daysBetween = Math.round(diffInMilliseconds / oneDay);
    return daysBetween / 365;
  }

}
