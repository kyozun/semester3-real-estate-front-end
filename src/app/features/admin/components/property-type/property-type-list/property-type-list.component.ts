import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Button } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService, PrimeTemplate } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RatingModule } from 'primeng/rating';
import { ScrollTopModule } from 'primeng/scrolltop';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { environment } from '../../../../../../environments/environment.development';
import { PropertyTypeService } from '../../../../property/services/property-type.service';
import { PropertyType } from '../../../../../shared/models/property-type';

@Component({
  selector: 'app-property-type-list',
  standalone: true,
  imports: [AsyncPipe, Button, ConfirmDialogModule, CurrencyPipe, InputTextModule, PrimeTemplate, ProgressBarModule, ProgressSpinnerModule, RatingModule, RouterLink, ScrollTopModule, TableModule, TagModule, ToastModule, ToolbarModule, FormsModule],
  templateUrl: './property-type-list.component.html',
  styleUrl: './property-type-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyTypeListComponent implements OnInit {
  @ViewChild('inputSearch', { static: true }) inputSearch = HTMLInputElement;
  protected readonly environment = environment;
  private router = inject(Router);
  private propertyTypeService = inject(PropertyTypeService);
  propertyType$: Observable<PropertyType[]> = this.propertyTypeService.getPropertyTypes$();
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.propertyTypeService.getPropertyTypes();
  }

  openPropertyType(id: string) {
    this.router.navigate(['/my-account/all-listings/view'], { queryParams: { propertyId: id } });
  }

  editPropertyType(id: string) {
    this.router.navigate(['/my-account/all-listings/edit'], { queryParams: { propertyId: id } });
  }

  deletePropertyType(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'p-button-secondary p-button-rounded',
      acceptButtonStyleClass: 'p-button-primary p-button-rounded',
      accept: () => {
        this.propertyTypeService.deletePropertyType(id);
        this.messageService.add({
          severity: 'info',
          summary: 'Successful',
          detail: 'Deleted',
          life: 2500,
        });
      },
    });
  }
}
