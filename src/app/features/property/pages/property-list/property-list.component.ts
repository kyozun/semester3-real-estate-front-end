import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FooterComponent } from '../../../../core/layout/footer/footer.component';
import { HeaderComponent } from '../../../../core/layout/header/header.component';
import { Router, RouterLink } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { AsyncPipe, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { delay, Observable, of } from 'rxjs';
import { AvatarModule } from 'primeng/avatar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { SliderChangeEvent, SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressBarModule } from 'primeng/progressbar';
import { Button } from 'primeng/button';
import { ScrollTopModule } from 'primeng/scrolltop';
import { RadioButtonModule } from 'primeng/radiobutton';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

interface City {
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
  cities!: City[];
  filterForm!: FormGroup;

  /*DI*/
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private realEstateService = inject(PropertyService);

  /*Observable*/
  realEstates$: Observable<any[]> = this.realEstateService.realEstates$;
  prices$: Observable<{ label: string; min: number; max: number }[]>;
  isLoading$: Observable<boolean> = this.realEstateService.isLoading$;


  ngOnInit(): void {
    /*Get All Real Estate*/
    this.getRealEstates('phone');

    this.prices$ = of([
      { label: 'All Prices', min: 0, max: 0 },
      { label: '0 - 120000', min: 0, max: 120000 },
      { label: '120000 - 140000', min: 120000, max: 140000 },
      { label: '140000 - 160000', min: 140000, max: 160000 },
      { label: '160000 - 180000', min: 160000, max: 180000 },
      { label: '180000 - 200000', min: 180000, max: 200000 },
    ]).pipe(delay(500));

    this.cities = [
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
      propertyTypes: this.formBuilder.group({
        allTypes: [false],
        house: [false],
        apartment: [false],
      }),
      price: this.formBuilder.control(''),
      area: this.formBuilder.group({
        allAreas: [true],
        area: [false],
      }),
      bedrooms: this.formBuilder.group({
        bedroomRange: [[1, 5]],
      }),
      bathrooms: this.formBuilder.group({
        bathroomRange: [[1, 5]],
      }),
      directions: [''],

      outdoorFeatures: this.formBuilder.group({
        swimmingPool: [false],
        garage: [false],
        balcony: [false],
        outdoorArea: [false],
      }),
      indoorFeatures: this.formBuilder.group({
        dishwasher: [false],
        alarmSystem: [false],
        gym: [false],
      }),
    });
  }

  getRealEstates(query: string): void {
    this.realEstateService.getRealEstates(query);
  }

  getRealEstate(id: string) {
    this.realEstateService.getRealEstates(id);
  }

  OnBedroomChange($event: SliderChangeEvent) {
    // if ($event.values) {
    //   this.minBedroomInput.nativeElement.value = $event.values[0];
    //   this.maxBedroomInput.nativeElement.value = $event.values[1];
    // }
  }

  OnBathroomChange($event: SliderChangeEvent) {
    // if ($event.values) {
    //   this.minBathroomInput.nativeElement.value = $event.values[0];
    //   this.maxBathroomInput.nativeElement.value = $event.values[1];
    // }
  }

  clearFilters() {
    this.filterForm.reset();
  }

  onFilterFormChange($event: any) {
    console.log($event);
    // this.filterForm.valueChanges.subscribe((value) => {
    //   if (value.propertyTypes?.allTypes) {
    //     this.selectAllTypes();
    //     this.getRealEstates('phone');
    //   } else if (!value.propertyTypes?.allTypes) {
    //     this.deselectAllTypes();
    //   } else {
    //   }
    // });
  }



  openPropertyDetail(property: any) {
    this.router.navigate(['/property'], { queryParams: { id: property.id, email: 'cuong@gmail.com' } });
  }


  onCheckBoxChange(event: any) {
    console.log(event.value);
  }
}
