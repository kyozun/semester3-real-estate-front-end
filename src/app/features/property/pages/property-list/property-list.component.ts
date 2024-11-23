import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../../../../core/layout/footer/footer.component';
import { HeaderComponent } from '../../../../core/layout/header/header.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { AsyncPipe, CurrencyPipe, NgForOf, NgOptimizedImage, UpperCasePipe } from '@angular/common';
import { BehaviorSubject, combineLatest, delay, map, Observable, of } from 'rxjs';
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
import { RadioButtonClickEvent, RadioButtonModule } from 'primeng/radiobutton';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';
import { SelectOption } from '../../../../shared/models/select-option';
import { Direction } from '../../../../shared/models/direction';
import { TagModule } from 'primeng/tag';
import { Property } from '../../models/property';
import { PropertyType } from '../../../../shared/models/property-type';
import { PropertyTypeService } from '../../services/property-type.service';
import { DirectionService } from '../../services/direction.service';

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
    RouterOutlet,
    TagModule,
    UpperCasePipe,
  ],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css',
  providers: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyListComponent implements OnInit {
  query: string = '';
  checked: boolean = false;
  first: number = 0;
  rows: number = 10;
  filterForm: FormGroup;
  area$: Observable<{ label: string; min: number; max: number }[]>;
  propertyTypeFilter$ = new BehaviorSubject<string[]>([]);
  directionFilter$ = new BehaviorSubject<string[]>([]);
  priceRangeFilter$ = new BehaviorSubject<string | null>(null);
  bedroomFilter$ = new BehaviorSubject<number>(0);
  bathroomFilter$ = new BehaviorSubject<number>(0);
  protected readonly environment = environment;
  private currencyPipe = inject(CurrencyPipe);

  priceRanges: SelectOption[] = [
    { label: 'All Prices', value: '0' },
    {
      label: this.currencyPipe.transform(0, 'USD', 'symbol', '1.0-0') + ' to ' + this.currencyPipe.transform(100000, 'USD', 'symbol', '1.0-0'),
      value: '0-100000',
    },
    {
      label: this.currencyPipe.transform(100000, 'USD', 'symbol', '1.0-0') + ' to ' + this.currencyPipe.transform(200000, 'USD', 'symbol', '1.0-0'),
      value: '100000-200000',
    },
    {
      label: this.currencyPipe.transform(200000, 'USD', 'symbol', '1.0-0') + ' to ' + this.currencyPipe.transform(300000, 'USD', 'symbol', '1.0-0'),
      value: '200000-300000',
    },
    { label: 'From ' + this.currencyPipe.transform(300000, 'USD', 'symbol', '1.0-0'), value: '300000' },
  ];

  /*DI*/
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private http = inject(HttpClient);
  private propertyService = inject(PropertyService);
  isLoading$: Observable<boolean> = this.propertyService.getLoading$();
  properties$: Observable<Property[]> = combineLatest([this.propertyService.getProperties$(), this.propertyTypeFilter$, this.priceRangeFilter$, this.directionFilter$, this.bedroomFilter$, this.bathroomFilter$]).pipe(
    map(([properties, selectedPropertyTypeIds, selectedPriceRange, selectedDirectionsIds, selectedBedroom, selectedBathroom]) => {
      let filteredProperties = properties;
      console.log(selectedDirectionsIds);
      console.log(properties);

      // Filter by Direction
      if (selectedDirectionsIds.length > 0) {
        filteredProperties = filteredProperties.filter((property) => selectedDirectionsIds.includes(property.direction.directionId));
      }

      // Filter by Property Type
      if (selectedPropertyTypeIds.length > 0) {
        filteredProperties = filteredProperties.filter((property) => selectedPropertyTypeIds.includes(property.propertyType.propertyTypeId));
      }

      // Filter by Price Range
      if (selectedPriceRange) {
        switch (selectedPriceRange) {
          case '0-100000':
            filteredProperties = filteredProperties.filter((property) => property.price >= 0 && property.price <= 100000);
            break;
          case '100000-200000':
            filteredProperties = filteredProperties.filter((property) => property.price >= 100000 && property.price <= 200000);
            break;
          case '200000-300000':
            filteredProperties = filteredProperties.filter((property) => property.price >= 200000 && property.price <= 300000);
            break;
          case '300000':
            filteredProperties = filteredProperties.filter((property) => property.price > 300000);
            break;
          default:
            break;
        }
      }

      // Filter by Bedroom
      if (selectedBedroom) {
        filteredProperties = filteredProperties.filter((property) => property.bedroom === selectedBedroom);
      }

      // Filter by Bedroom
      if (selectedBathroom) {
        filteredProperties = filteredProperties.filter((property) => property.bathroom === selectedBathroom);
      }

      return filteredProperties;
    })
  );
  private directionService = inject(DirectionService);
  directions$: Observable<Direction[]> = this.directionService.getDirections$();
  private propertyTypeService = inject(PropertyTypeService);
  /*Observable*/
  propertyTypes$: Observable<PropertyType[]> = this.propertyTypeService.getPropertyTypes$();

  ngOnInit(): void {
    this.directionService.getDirections();
    this.propertyTypeService.getPropertyTypes();

    this.area$ = of([
      { label: 'All Areas', min: 0, max: 0 },
      { label: '0 - 30', min: 0, max: 30 },
      { label: '30 - 50', min: 30, max: 50 },
      { label: '50 - 80', min: 50, max: 80 },
      { label: '80 - 100', min: 80, max: 100 },
    ]).pipe(delay(500));

    this.filterForm = this.formBuilder.group({
      price: ['0'],
      propertyType: [''],
      area: [''],
      bedroom: ['0'],
      bathroom: ['0'],
      directions: [''],
    });

    const queryParams = new URLSearchParams(this.filterForm.value).toString();
    this.getRealEstates('');
  }

  getRealEstates(query: string): void {
    this.propertyService.getProperties(query);
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

  OnBedroomChange($event: SliderChangeEvent) {
    this.bedroomFilter$.next($event.value as number);
  }

  OnBathroomChange($event: SliderChangeEvent) {
    this.bathroomFilter$.next($event.value as number);
  }

  clearFilters() {
    // this.properties$ = this.propertyService.properties$;
    this.propertyTypeFilter$.next([]); // Emit default values
    this.priceRangeFilter$.next('0');
    this.directionFilter$.next([]);
    this.bedroomFilter$.next(0);
    this.filterForm.reset({
      price: 0,
    });
  }

  onPropertyTypeChange($event: CheckboxChangeEvent) {
    this.propertyTypeFilter$.next($event.checked);
  }

  onDirectionChange($event: any) {
    this.directionFilter$.next($event.value);
  }

  onPriceRangeChange($event: RadioButtonClickEvent) {
    this.priceRangeFilter$.next($event.value);
  }

  navigateToPropertyDetail(propertyId: string) {
    this.router.navigate(['/property'], { queryParams: { propertyId: propertyId } });
  }

  getTagColor(name: string) {
    if (name === 'For Rent') {
      return 'success';
    }
    return 'success';
  }

  getSeverity(propertyTypeName: string) {
    switch (propertyTypeName) {
      case 'For Sell':
        return;
      default:
        return 'danger';
    }
  }
}
