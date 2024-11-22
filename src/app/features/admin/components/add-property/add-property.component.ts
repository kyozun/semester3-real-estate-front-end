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

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [TagModule, InputTextModule, InputGroupModule, InputGroupAddonModule, DropdownModule, AsyncPipe, SkeletonModule, EditorModule, FormsModule, ReactiveFormsModule, Button, RouterLink, CurrencyPipe],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPropertyComponent implements OnInit {
  public propertyForm: FormGroup;
  private propertyService = inject(PropertyService);
  public categories$: Observable<string[]> = this.propertyService.category$;
  public propertyTypes$: Observable<SelectOption[]> = this.propertyService.propertyTypes$;
  private provinceService = inject(ProvinceService);
  public provinces$: Observable<SelectOption[]> = this.provinceService.provinces$;
  public districts$: Observable<SelectOption[]> = this.provinceService.districts$;
  public wards$: Observable<SelectOption[]> = this.provinceService.wards$;
  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.propertyService.getCategories();
    this.propertyService.getPropertyTypes();
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
    this.provinceService.getDistricts($event.value)
  }

  onDistrictChange($event: DropdownChangeEvent) {
    console.log($event.value);
    this.provinceService.getWards($event.value)
  }
}
