import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FooterComponent } from '../../../../core/layout/footer/footer.component';
import { HeaderComponent } from '../../../../core/layout/header/header.component';
import { Router, RouterLink } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { AsyncPipe, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Observable } from 'rxjs';
import { AvatarModule } from 'primeng/avatar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { SliderChangeEvent, SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressBarModule } from 'primeng/progressbar';
import { Button } from 'primeng/button';
import { ScrollTopModule } from 'primeng/scrolltop';

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
  private router = inject(Router);
  private realEstateService = inject(PropertyService);

  /*Observable*/
  realEstates$: Observable<any[]> = this.realEstateService.realEstates$;
  isLoading$: Observable<boolean> = this.realEstateService.isLoading$;

  // get bedroomRange() {
  //   return this.filterForm.get('bedrooms.bedroomRange')?.value;
  private formBuilder = inject(FormBuilder);
  filterForm = this.formBuilder.group({
    propertyTypes: this.formBuilder.group({
      allTypes: [false],
      house: [false],
      apartment: [false],
    }),
    price: this.formBuilder.group({
      allPrices: [true],
      price: [0],
    }),
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

  ngOnInit(): void {
    this.onFilterFormChange();
    /*Get All Real Estate*/
    this.getRealEstates('phone');

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
  }

  getRealEstates(query: string): void {
    this.realEstateService.getRealEstates(query);
  }

  getRealEstate(id: string) {
    this.realEstateService.getRealEstates(id);
  }

  OnBedroomChange($event: SliderChangeEvent) {
    if ($event.values) {
      this.minBedroomInput.nativeElement.value = $event.values[0];
      this.maxBedroomInput.nativeElement.value = $event.values[1];
    }
  }

  OnBathroomChange($event: SliderChangeEvent) {
    if ($event.values) {
      this.minBathroomInput.nativeElement.value = $event.values[0];
      this.maxBathroomInput.nativeElement.value = $event.values[1];
    }
  }

  clearFilters() {
    this.filterForm.reset();
  }

  onFilterFormChange() {
    this.filterForm.valueChanges.subscribe((value) => {
      if (value.propertyTypes?.allTypes) {
        this.selectAllTypes();
        this.getRealEstates('phone');
      } else if (!value.propertyTypes?.allTypes) {
        this.deselectAllTypes();
      }
      else {}
    });
  }

  selectAllTypes() {
    this.filterForm.controls.propertyTypes.patchValue(
      {
        allTypes: true,
        house: true,
        apartment: true,
      },
      { emitEvent: false }
    );
  }

  deselectAllTypes() {
    this.filterForm.controls.propertyTypes.patchValue(
      {
        allTypes: false,
        house: false,
        apartment: false,
      },
      { emitEvent: false }
    );
  }

  openPropertyDetail(property: any) {
    this.router.navigate(['/property'], { queryParams: { id: property.id, email: 'cuong@gmail.com' } });
  }

  clearSpecificTypes(selectAll = true) {
    this.filterForm.controls.propertyTypes.patchValue(
      {
        allTypes: true,
        house: false,
        apartment: false,
      },
      { emitEvent: false }
    );
    if (selectAll) {
      this.filterForm.controls.propertyTypes.controls.allTypes.setValue(true, { emitEvent: false });
    }
  }
}
