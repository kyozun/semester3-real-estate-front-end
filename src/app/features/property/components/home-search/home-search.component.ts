import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HomeMostViewedComponent } from '../home-most-viewed/home-most-viewed.component';
import { HomeForYouComponent } from '../home-for-you/home-for-you.component';
import { HomeAgentComponent } from '../home-agent/home-agent.component';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { Ripple } from 'primeng/ripple';
import { Router } from '@angular/router';
import { SliderModule } from 'primeng/slider';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-home-search',
  standalone: true,
  imports: [TabViewModule, InputTextModule, ButtonModule, HomeMostViewedComponent, HomeForYouComponent, HomeAgentComponent, DialogModule, CheckboxModule, FormsModule, ReactiveFormsModule, DropdownModule, Ripple, SliderModule],
  templateUrl: './home-search.component.html',
  styleUrl: './home-search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeSearchComponent implements OnInit {
  visible: boolean = false;

  bathroomOptions = [
    { label: 'Any', value: null },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6+', value: 6 },
  ];

  selectedCity: City | undefined;

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

  showDialog() {
    this.visible = true;
  }

  ngOnInit() {}

  /* Submit the form */
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

    // Navigate to a new route with the query parameters
    this.router.navigate(['/property/search']);

    // Close the dialog
    this.visible = false;
  }

  clearFilters() {
    this.searchForm.reset();
  }
}
