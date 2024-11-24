import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Button } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService, PrimeTemplate } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Router, RouterLink } from '@angular/router';
import { ScrollTopModule } from 'primeng/scrolltop';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';
import { PropertyService } from '../../../property/services/property.service';
import { Property } from '../../../property/models/property';
import { CheckboxChangeEvent } from 'primeng/checkbox';
import { SliderChangeEvent } from 'primeng/slider';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-all-listings',
  standalone: true,
  imports: [AsyncPipe, Button, ConfirmDialogModule, CurrencyPipe, InputTextModule, PrimeTemplate, ProgressBarModule, ProgressSpinnerModule, RouterLink, ScrollTopModule, TableModule, TagModule, ToastModule, ToolbarModule],
  templateUrl: './all-listings.component.html',
  styleUrl: './all-listings.component.css',
  providers: [ConfirmationService, MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllListingsComponent {
  @ViewChild('inputSearch', { static: true }) inputSearch = HTMLInputElement;
  query: string = '';
  checked: boolean = false;
  first: number = 0;
  rows: number = 10;
  filterForm!: FormGroup;
  /*Observable*/
  prices$: Observable<{ label: string; value: string }[]>;
  propertyTypeOptions$: Observable<{ label: string; value: string }[]>;
  area$: Observable<{ label: string; min: number; max: number }[]>;
  protected readonly environment = environment;
  /*DI*/
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private realEstateService = inject(PropertyService);
  properties$: Observable<Property[]> = this.realEstateService.getProperties$();
  isLoading$: Observable<boolean> = this.realEstateService.getLoading$();
  private confirmationService = inject(ConfirmationService);

  /*DI*/
  private messageService = inject(MessageService);

  ngOnInit(): void {
    /*Get All Real Estate*/

    this.prices$ = of([
      { label: 'All Prices', value: '0-200000' },
      { label: '0 - 120000', value: '0-120000' },
      { label: '120000 - 140000', value: '120000-140000' },
      { label: '140000 - 160000', value: '140000-160000' },
      { label: '160000 - 180000', value: '160000-180000' },
    ]).pipe(delay(500));

    this.propertyTypeOptions$ = of([
      { label: 'All Types', value: 'All Types' },
      { label: 'House', value: 'House' },
      { label: 'Apartment', value: 'Apartment' },
      { label: 'Garden', value: 'Garden' },
    ]).pipe(delay(500));

    this.area$ = of([
      { label: 'All Areas', min: 0, max: 0 },
      { label: '0 - 30', min: 0, max: 30 },
      { label: '30 - 50', min: 30, max: 50 },
      { label: '50 - 80', min: 50, max: 80 },
      { label: '80 - 100', min: 80, max: 100 },
    ]).pipe(delay(500));

    this.filterForm = this.formBuilder.group({
      price: [''],
      propertyType: [''],
      area: [''],
      bedroom: [''],
      bathroom: [''],
      directions: [''],
    });

    const queryParams = new URLSearchParams(this.filterForm.value).toString();
    this.getProperties(queryParams);
  }

  getProperties(query: string): void {
    this.realEstateService.getProperties(query);
  }

  getRealEstate(id: string) {
    // this.realEstateService.getRealEstates(id);
  }

  onPriceChange(price: { label: string; min: number; max: number }) {
    console.log('Selected Price:', price);
    // Add logic to filter based on the selected price
  }

  onPropertyTypeChange(event: CheckboxChangeEvent) {
    if (event.checked as string[]) {
      console.log(event.checked);
      const queryParams = event.checked.map((q: string) => `q=${q}`).join('&');

      console.log(queryParams);
      // this.router.navigate([queryParams]);
      // this.getRealEstates('tablet');
    }
  }

  onAreaChange(event: any) {
    const areaFormArray = this.filterForm.get('area') as FormArray;
    if (event.checked) {
      areaFormArray.push(this.formBuilder.control(event.value));
    } else {
      const index = areaFormArray.controls.findIndex((x) => x.value === event.value);
      areaFormArray.removeAt(index);
    }
    console.log('Areas:', areaFormArray.value);
  }

  OnBedroomChange(event: SliderChangeEvent) {
    console.log(this.filterForm.value);
  }

  OnBathroomChange(event: SliderChangeEvent) {
    console.log(this.filterForm.value);
  }

  onDirectionChange(event: any) {
    const directionsFormArray = this.filterForm.get('directions') as FormArray;
    directionsFormArray.setValue(event.value); // Update the FormArray with the selected values
    console.log('Directions:', directionsFormArray.value);
  }

  clearFilters() {
    this.filterForm.reset();
  }

  onFilterFormChange($event: any) {
    // console.log(this.filterForm.value);
    const formValues = this.filterForm.value;
    const filteredValues = Object.keys(formValues)
      .filter((key) => formValues[key] !== null && formValues[key] !== '')
      .reduce((acc, key) => ({ ...acc, [key]: formValues[key] }), {});
    const queryParams = new URLSearchParams(filteredValues).toString();
    this.getProperties(queryParams);
  }

  openProperty(propertyId: string) {
    this.router.navigate(['/my-account/all-listings/view'], { queryParams: { propertyId: propertyId } });
  }

  editProperty(propertyId: string) {
    this.router.navigate(['/my-account/all-listings/edit'], { queryParams: { propertyId: propertyId } });
  }

  /*OK*/
  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'p-button-secondary p-button-rounded',
      acceptButtonStyleClass: 'p-button-primary p-button-rounded',
      accept: () => {
        this.properties$.subscribe((property) => {
          property = property.filter((val) => !property?.includes(val) && property.includes(val));
        });
        this.messageService.add({
          severity: 'info',
          summary: 'Successful',
          detail: 'Property Deleted',
          life: 2500,
        });
      },
    });
  }

  getSeverity(status: boolean) {
    switch (status) {
      case true:
        return 'danger';
      case false:
        return;
    }
  }
}
