import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Owner } from 'src/app/interfaces/owner.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.scss']
})
export class OwnerListComponent implements OnInit {
  public errorMessage: string = '';
  public showError: boolean = false;
  public owners: Owner[] = [];

  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router) { }

  public ngOnInit(): void {
    console.log('Call func: getData owner.');
    this.getAllOwners();
  }

  public getAllOwners = () => {
    this.showError = false;
    let apiAddress = 'api/owner';
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.owners = res as Owner[];
      },
        (error) => {
          this.errorMessage = error;
          this.showError = true;
        }
      );
  }

  public getOwnerDetails = (id: any) => {
    console.log('id:', id);
    const detailsUrl = `owner/details/${id}`;
    this.router.navigate([detailsUrl]); //Chuyển hướng sang trang details
  }

}
