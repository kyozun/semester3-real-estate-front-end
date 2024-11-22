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
  filterForm!: FormGroup;
  area$: Observable<{ label: string; min: number; max: number }[]>;
  propertyTypeFilter$ = new BehaviorSubject<string[]>([]);
  directionFilter$ = new BehaviorSubject<string[]>([]);
  priceRangeFilter$ = new BehaviorSubject<string | null>(null);
  protected readonly environment = environment;
  private currencyPipe = inject(CurrencyPipe);

  priceRanges: SelectOption[] = [
    { label: 'All Prices', value: '0' },
    {
      label: this.currencyPipe.transform(0, 'USD', 'symbol', '1.0-0') + ' to ' + this.currencyPipe.transform(100000, 'USD'),
      value: '0-100000',
    },
    {
      label: this.currencyPipe.transform(100000, 'USD', 'symbol', '1.0-0') + ' to ' + this.currencyPipe.transform(150000, 'USD', 'symbol', '1.0-0'),
      value: '100000-150000',
    },
    {
      label: this.currencyPipe.transform(150000, 'USD', 'symbol', '1.0-0') + ' to ' + this.currencyPipe.transform(200000, 'USD', 'symbol', '1.0-0'),
      value: '150000-200000',
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
  /*Observable*/
  propertyTypes$: Observable<SelectOption[]> = this.propertyService.propertyTypes$;
  directions$: Observable<Direction[]> = this.propertyService.directions$;
  isLoading$: Observable<boolean> = this.propertyService.isLoading$;
  properties$ = combineLatest([this.propertyService.properties$, this.propertyTypeFilter$, this.priceRangeFilter$, this.directionFilter$]).pipe(
    map(([properties, selectedPropertyTypeIds, selectedPriceRange, selectedDirectionsIds]) => {
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
            filteredProperties = filteredProperties.filter((property) => property.price >= 0 && property.price <= 120000);
            break;
          case '100000-150000':
            filteredProperties = filteredProperties.filter((property) => property.price >= 100000 && property.price <= 150000);
            break;
          case '150000-200000':
            filteredProperties = filteredProperties.filter((property) => property.price >= 150000 && property.price <= 200000);
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

      return filteredProperties;
    })
  );

  ngOnInit(): void {
    this.propertyService.getDirections();
    this.propertyService.getPropertyTypes();

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
    this.getRealEstates(queryParams);
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

  OnBedroomChange(event: SliderChangeEvent) {
    console.log(this.filterForm.value);
  }

  OnBathroomChange(event: SliderChangeEvent) {
    console.log(this.filterForm.value);
  }

  clearFilters() {
    this.filterForm.reset();
    this.properties$ = this.propertyService.properties$;
  }

  onFilterFormChange($event: any) {
    console.log($event.value);
    this.properties$ = this.propertyService.properties$.pipe(map((properties) => properties.filter((property) => property.price > $event.value)));
    console.log(this.filterForm.value);
    const formValues = this.filterForm.value;
  }

  // Update property type filter
  onPropertyTypeChange($event: CheckboxChangeEvent) {
    this.propertyTypeFilter$.next($event.checked);
  }

  onDirectionChange($event: any) {
    this.directionFilter$.next($event.value);
  }

  // Update price range filter
  onPriceRangeChange($event: RadioButtonClickEvent) {
    this.priceRangeFilter$.next($event.value);
  }

  openPropertyDetail(property: any) {
    this.router.navigate(['/property'], { queryParams: { id: property.id, email: 'cuong@gmail.com' } });
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
