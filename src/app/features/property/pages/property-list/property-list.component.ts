import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FooterComponent } from '../../../../core/layout/footer/footer.component';
import { HeaderComponent } from '../../../../core/layout/header/header.component';
import { Router, RouterLink } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { AsyncPipe, CurrencyPipe, NgForOf, NgOptimizedImage } from '@angular/common';
import { combineLatest, delay, Observable, of } from 'rxjs';
import { AvatarModule } from 'primeng/avatar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { SliderChangeEvent, SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressBarModule } from 'primeng/progressbar';
import { Button } from 'primeng/button';
import { ScrollTopModule } from 'primeng/scrolltop';
import { RadioButtonModule } from 'primeng/radiobutton';
import { HttpClient } from '@angular/common/http';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

interface Direction {
  name: string;
  code: string;
}

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [
    FormsModule,
    SliderModule,
    InputTextModule,
    HeaderComponent,
    AsyncPipe,
    CurrencyPipe,
    ToggleButtonModule,
    AvatarModule,
    CheckboxModule,
    ReactiveFormsModule,
    FooterComponent,
    DropdownModule,
    MultiSelectModule,
    SkeletonModule,
    ProgressBarModule,
    Button,
    ScrollTopModule,
    NgOptimizedImage,
    RouterLink,
    RadioButtonModule,
    NgForOf,
  ],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyListComponent implements OnInit {
  @ViewChild('minBedroom') minBedroomInput: ElementRef;
  @ViewChild('maxBedroom') maxBedroomInput: ElementRef;
  @ViewChild('minBathroom') minBathroomInput: ElementRef;
  @ViewChild('maxBathroom') maxBathroomInput: ElementRef;
  query: string = '';
  checked: boolean = false;
  first: number = 0;
  rows: number = 10;
  directions!: Direction[];
  filterForm!: FormGroup;
  /*Observable*/
  prices$: Observable<{ label: string; value: string }[]>;
  propertyTypeOptions$: Observable<{ label: string; value: string }[]>;
  area$: Observable<{ label: string; min: number; max: number }[]>;
  /*DI*/
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private http = inject(HttpClient);
  private realEstateService = inject(PropertyService);
  properties$: Observable<any[]> = this.realEstateService.properties$;
  filteredProperties$: Observable<any[]>;
  isLoading$: Observable<boolean> = this.realEstateService.isLoading$;

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

    this.directions = [
      { name: 'East', code: 'NY' },
      { name: 'West', code: 'RM' },
      { name: 'North', code: 'LDN' },
      { name: 'South', code: 'IST' },
      { name: 'North-east', code: 'PRS' },
      { name: 'North-west', code: 'PRS' },
      { name: 'South-east', code: 'PRS' },
      { name: 'South-west', code: 'PRS' },
    ];

    this.filterForm = this.formBuilder.group({
      price: [''],
      propertyType: [''],
      area: [''],
      bedroom: [''],
      bathroom: [''],
      directions: [''],
    });

    const queryParams = new URLSearchParams(this.filterForm.value).toString();
    this.getRealEstates(queryParams);

  }


  getRealEstates(query: string): void {
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
    this.getRealEstates(queryParams);
  }

  openPropertyDetail(property: any) {
    this.router.navigate(['/property'], { queryParams: { id: property.id, email: 'cuong@gmail.com' } });
  }

  onCheckBoxChange(event: any) {
    console.log(event.value);
  }
}
