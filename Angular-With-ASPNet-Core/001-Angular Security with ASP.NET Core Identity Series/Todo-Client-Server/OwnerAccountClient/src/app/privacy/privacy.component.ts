import { Component, OnInit } from '@angular/core';
import { Claim } from '../interfaces/claim.model';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { RepositoryService } from '../shared/services/repository.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  public showError: boolean = false;
  public errorMessage: string = '';
  public claims: Claim[] = [];

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getClaims();
  }

  public getClaims = () => {
    this.showError = false;
    this.repository.getData('api/companies/privacy')
      .subscribe(res => {
        var values = Object.values(res);
        values.map((item, index) => {
          const claim: Claim = {
            type: item.type,
            value: item.value
          }
          this.claims.push(claim);
        })
      },
      (error) => {
        this.errorMessage = this.errorHandler.handleError(error);
        this.showError = true;
        console.log('errorMessage:', this.errorMessage);
      })
  }



}
