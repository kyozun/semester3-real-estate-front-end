import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Button } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyService } from '../../../property/services/property.service';
import { CategoryService } from '../../../property/services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../../../../shared/models/category';
import { PropertyTypeService } from '../../../property/services/property-type.service';
import { PropertyType } from '../../../../shared/models/property-type';
import { ProvinceService } from '../../../property/services/province.service';
import { SelectOption } from '../../../../shared/models/select-option';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SkeletonModule } from 'primeng/skeleton';
import { EditorModule } from 'primeng/editor';
import { RouterLink } from '@angular/router';
import { YtPlayerComponent } from '../../../../shared/components/yt-player/yt-player.component';

@Component({
  selector: 'app-add-listing',
  standalone: true,
  imports: [TagModule, InputTextModule, InputGroupModule, InputGroupAddonModule, DropdownModule, AsyncPipe, SkeletonModule, EditorModule, FormsModule, ReactiveFormsModule, Button, RouterLink, CurrencyPipe, YtPlayerComponent],
  templateUrl: './add-listing.component.html',
  styleUrl: './add-listing.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddListingComponent implements OnInit {
  propertyForm: FormGroup;
  private propertyService = inject(PropertyService);
  private categoryService = inject(CategoryService);
  categories$: Observable<Category[]> = this.categoryService.getCategories$();
  private propertyTypeService = inject(PropertyTypeService);
  propertyTypes$: Observable<PropertyType[]> = this.propertyTypeService.getPropertyTypes$();
  private provinceService = inject(ProvinceService);
  provinces$: Observable<SelectOption[]> = this.provinceService.provinces$;
  districts$: Observable<SelectOption[]> = this.provinceService.districts$;
  wards$: Observable<SelectOption[]> = this.provinceService.wards$;
  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.categoryService.getCategories();
    this.propertyTypeService.getPropertyTypes();
    this.provinceService.getProvinces();
    this.propertyForm = this.formBuilder.group({
      propertyName: [, Validators.required],
      price: ['', Validators.required],
      bedroom: ['', Validators.required],
      bathroom: ['', Validators.required],
      floor: ['', Validators.required],
      propertyCategory: ['', Validators.required],
      propertyType: [''],
      description: [''],
      propertyAddress: [''],
      youtubeLink: [''],
      address: this.formBuilder.group({
        province: [''],
        district: [''],
        ward: [''],
        zipcode: [''],
      }),
    });
  }

  submitPropertyForm() {
    console.log(this.propertyForm.value);
  }

  clearPropertyForm() {
    this.propertyForm.reset();
  }

  onProvinceChange($event: DropdownChangeEvent) {
    console.log($event.value);
    this.provinceService.getDistricts($event.value);
  }

  onDistrictChange($event: DropdownChangeEvent) {
    console.log($event.value);
    this.provinceService.getWards($event.value);
  }

  getVideoId() {
    const videoLink = this.propertyForm.get('youtubeLink')?.value;
    const regex = /[?&]v=([^&]+)/;
    const videoId = videoLink.match(regex);
    return videoId ? videoId[1] : null;
  }
}
