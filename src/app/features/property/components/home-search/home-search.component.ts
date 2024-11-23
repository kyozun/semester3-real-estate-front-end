import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HomeMostViewedComponent } from '../home-most-viewed/home-most-viewed.component';
import { HomeForYouComponent } from '../home-for-you/home-for-you.component';
import { HomeAgentComponent } from '../home-agent/home-agent.component';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { Ripple } from 'primeng/ripple';
import { Router, RouterLink } from '@angular/router';
import { SliderModule } from 'primeng/slider';
import { Observable } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Property } from '../../models/property';
import { PropertyService } from '../../services/property.service';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-home-search',
  standalone: true,
  imports: [TabViewModule, InputTextModule, ButtonModule, HomeMostViewedComponent, HomeForYouComponent, HomeAgentComponent, DialogModule, CheckboxModule, FormsModule, ReactiveFormsModule, DropdownModule, Ripple, SliderModule, AsyncPipe, RouterLink, CurrencyPipe],
  templateUrl: './home-search.component.html',
  styleUrl: './home-search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeSearchComponent implements OnInit {
  visible: boolean = false;
  isInputFocused = false;

  bathroomOptions = [
    { label: 'Any', value: null },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6+', value: 6 },
  ];

  searchInput = new FormControl('');
  private formBuilder = inject(FormBuilder);
  searchForm = this.formBuilder.group({
    propertyTypes: this.formBuilder.group({
      allTypes: [false],
      house: [false],
      apartment: [false],
      villa: [false],
    }),
    price: this.formBuilder.group({
      minPrice: [''],
      maxPrice: [''],
    }),
    bedrooms: this.formBuilder.group({
      minBedrooms: [''],
      maxBedrooms: [''],
    }),
    bathrooms: this.formBuilder.group({
      minBathrooms: [''],
      maxBathrooms: [''],
    }),
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
  private router = inject(Router);
  private propertyService = inject(PropertyService);

  properties$: Observable<Property[]> = this.propertyService.getPropertiesSearch$();

  showDialog() {
    this.visible = true;
  }

  ngOnInit() {
    this.searchInput.valueChanges.subscribe((value) => this.propertyService.searchByKeyword(value as string));
  }

  onSubmit() {
    const formValues = this.searchForm.value;
    console.log(formValues);

    const queryParams: any = {
      ...formValues.price,
      ...formValues.bedrooms,
      ...formValues.bathrooms,
      ...formValues.outdoorFeatures,
      ...formValues.indoorFeatures,
    };
    console.log(queryParams);

    this.router.navigate(['/property/search']);
    // Close dialog
    this.visible = false;
  }

  clearFilters() {
    this.searchForm.reset();
  }

  protected readonly environment = environment;
}
