import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from 'src/app/interfaces/owner.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.scss']
})
export class OwnerDetailsComponent implements OnInit {
  public owner: Owner | undefined;
  public errorMessage: string = '';

  constructor(
    private repository: RepositoryService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private errorHandler: ErrorHandlerService
  ) { }

  public ngOnInit(): void {
    this.getOwnerDetails();
  }

  public getOwnerDetails = () => {
    let id = this.activeRoute.snapshot.params['id'];
    let apiUrl = `api/owner/${id}`;

    this.repository.getData(apiUrl).subscribe(
      res => { this.owner = res as Owner },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    );


  }
}
