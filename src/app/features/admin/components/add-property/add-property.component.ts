import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { Observable } from 'rxjs';
import { PropertyService } from '../../../property/services/property.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { EditorModule } from 'primeng/editor';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { ProvinceService } from '../../../property/services/province.service';
import { SelectOption } from '../../../../shared/models/select-option';
import { PropertyType } from '../../../../shared/models/property-type';
import { PropertyTypeService } from '../../../property/services/property-type.service';
import { CategoryService } from '../../../property/services/category.service';
import { Category } from '../../../../shared/models/category';
import { Province } from '../../../../shared/models/province';
import { District } from '../../../../shared/models/district';
import { Ward } from '../../../../shared/models/ward';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [TagModule, InputTextModule, InputGroupModule, InputGroupAddonModule, DropdownModule, AsyncPipe, SkeletonModule, EditorModule, FormsModule, ReactiveFormsModule, Button, RouterLink, CurrencyPipe],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPropertyComponent implements OnInit {
  propertyForm: FormGroup;
  private propertyService = inject(PropertyService);
  private categoryService = inject(CategoryService);
  categories$: Observable<Category[]> = this.categoryService.getCategories$();
  private propertyTypeService = inject(PropertyTypeService);
  propertyTypes$: Observable<PropertyType[]> = this.propertyTypeService.getPropertyTypes$();
  private provinceService = inject(ProvinceService);
  provinces$: Observable<Province[]> = this.provinceService.getProvinces$();
  districts$: Observable<District[]> = this.provinceService.getDistricts$();
  wards$: Observable<Ward[]> = this.provinceService.getWards$();
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
}
