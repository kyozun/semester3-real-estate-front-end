import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavComponent } from '../nav/nav.component';
import { ActivatedRoute } from '@angular/router';
import { RealEstateService } from '../services/real-estate.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AvatarModule } from 'primeng/avatar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { SliderChangeEvent, SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-real-estate-list',
  standalone: true,
  imports: [
    FormsModule,
    SliderModule,
    InputTextModule,
    NavComponent,
    AsyncPipe,
    CurrencyPipe,
    ToggleButtonModule,
    AvatarModule,
    CheckboxModule,
    ReactiveFormsModule,
    FooterComponent,
  ],
  templateUrl: './real-estate-list.component.html',
  styleUrl: './real-estate-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RealEstateListComponent implements OnInit {
  @ViewChild('minBedroom') minBedroomInput: ElementRef;
  @ViewChild('maxBedroom') maxBedroomInput: ElementRef;
  query: string = '';
  page: number = 1;
  checked: boolean = false;
  first: number = 0;
  rows: number = 10;
  // }
  private route = inject(ActivatedRoute);
  private realEstateService = inject(RealEstateService);
  realEstates$: Observable<any[]> = this.realEstateService.realEstates$;

  // get bedroomRange() {
  //   return this.filterForm.get('bedrooms.bedroomRange')?.value;
  private formBuilder = inject(FormBuilder);
  filterForm = this.formBuilder.group({
    propertyTypes: this.formBuilder.group({
      allTypes: [false],
      house: [false],
      apartment: [false],
      villa: [false],
    }),
    price: this.formBuilder.group({
      allPrices: [true],
      price: [false],
    }),
    area: this.formBuilder.group({
      allAreas: [true],
      area: [false],
    }),
    bedrooms: this.formBuilder.group({
      bedroomRange: [[1, 5]],
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

  // onPageChange(event: PageEvent) {
  //   this.first = event.first;
  //   this.rows = event.rows;
  // }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.query = params['query'] || '';
      this.page = +params['page'] || 1;

      // Use this.query and this.page to fetch or filter data
      this.searchData(this.query, this.page);
    });

    this.getRealEstates('phone');
  }

  searchData(query: string, page: number) {
    // Fetch or filter data based on query and page
    console.log('Searching for:', query, 'Page:', page);
  }

  getRealEstates(query: string): void {
    this.realEstateService.getRealEstates(query);
  }

  OnBedroomChange($event: SliderChangeEvent) {
    if ($event.values) {
      this.minBedroomInput.nativeElement.value = $event.values[0];
      this.maxBedroomInput.nativeElement.value = $event.values[1];
    }
  }
}
