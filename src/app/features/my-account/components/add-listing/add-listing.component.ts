import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { Button } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyService } from '../../../property/services/property.service';
import { CategoryService } from '../../../property/services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../../../../shared/models/category';
import { PropertyTypeService } from '../../../property/services/property-type.service';
import { PropertyType } from '../../../../shared/models/property-type';
import { ProvinceService } from '../../../property/services/province.service';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SkeletonModule } from 'primeng/skeleton';
import { EditorModule } from 'primeng/editor';
import { RouterLink } from '@angular/router';
import { YtPlayerComponent } from '../../../../shared/components/yt-player/yt-player.component';
import { CreateProperty } from '../../../property/models/createProperty';
import { DirectionService } from '../../../property/services/direction.service';
import { Direction } from '../../../../shared/models/direction';
import { JuridicalService } from '../../../property/services/juridical.service';
import { Juridical } from '../../../../shared/models/juridical';
import { Ward } from '../../../../shared/models/ward';
import { Province } from '../../../../shared/models/province';
import { District } from '../../../../shared/models/district';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import FormData from 'form-data';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-add-listing',
  standalone: true,
  imports: [TagModule, InputTextModule, InputGroupModule, InputGroupAddonModule, DropdownModule, AsyncPipe, SkeletonModule, EditorModule, FormsModule, ReactiveFormsModule, Button, RouterLink, CurrencyPipe, YtPlayerComponent, FileUploadModule, NgIf, NgForOf, ToastModule],
  templateUrl: './add-listing.component.html',
  styleUrl: './add-listing.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddListingComponent implements OnInit {
  propertyForm: FormGroup;
  imagePreview: string | ArrayBuffer | null | undefined = null;
  uploadedFiles: File[] = [];
  private propertyService = inject(PropertyService);
  private categoryService = inject(CategoryService);
  categories$: Observable<Category[]> = this.categoryService.getCategories$();
  private propertyTypeService = inject(PropertyTypeService);
  propertyTypes$: Observable<PropertyType[]> = this.propertyTypeService.getPropertyTypes$();
  private juridicalService = inject(JuridicalService);
  juridicals$: Observable<Juridical[]> = this.juridicalService.getJuridicals$();
  private directionService = inject(DirectionService);
  directions$: Observable<Direction[]> = this.directionService.getDirections$();
  private provinceService = inject(ProvinceService);
  provinces$: Observable<Province[]> = this.provinceService.getProvinces$();
  districts$: Observable<District[]> = this.provinceService.getDistricts$();
  wards$: Observable<Ward[]> = this.provinceService.getWards$();
  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.categoryService.getCategories();
    this.propertyTypeService.getPropertyTypes();
    this.provinceService.getProvinces();
    this.directionService.getDirections();
    this.juridicalService.getJuridicals();
    this.propertyForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      bedroom: ['1', Validators.required],
      bathroom: ['1', Validators.required],
      floor: ['1', Validators.required],
      direction: ['', Validators.required],
      area: ['', Validators.required],
      propertyCategory: ['', Validators.required],
      propertyType: ['', Validators.required],
      juridical: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      youtubeLink: ['', Validators.required],
      propertyImages: [''],
      coverImage: [''],
      propertyAddress: this.formBuilder.group({
        province: [''],
        district: [''],
        ward: [''],
        zipcode: [''],
      }),
    });
  }

  submitPropertyForm() {
    const formValues = this.propertyForm.value;

    const payload: CreateProperty = {
      title: formValues.title,
      description: formValues.description,
      address: formValues.address,
      price: formValues.price,
      furniture: formValues.furniture,
      area: formValues.area,
      floor: formValues.floor,
      bedroom: formValues.bedroom,
      bathroom: formValues.bathroom,
      categoryId: formValues.propertyCategory,
      directionId: formValues.direction,
      wardId: formValues.propertyAddress.ward,
      juridicalId: formValues.juridical,
      propertyTypeId: formValues.propertyType,
      propertyImages: formValues.propertyImages,
      coverImage: formValues.coverImage,
    };

    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      if (key === 'propertyImages') {
        payload[key].forEach((file: File) => formData.append(key, file));
      } else {
        formData.append(key, payload[key as keyof CreateProperty]);
      }
    });

    this.propertyService.createProperty(formData);
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

  getVideoId(): string {
    const videoLink = this.propertyForm.get('youtubeLink')?.value;

    if (!videoLink) {
      return '';
    }

    const videoId = videoLink.match(/[?&]v=([^&]+)/)?.[1];
    return videoId || '';
  }

  onSelect($event: FileSelectEvent) {
    const files = $event.files;
    this.uploadedFiles = [...this.uploadedFiles, ...files];
    this.propertyForm.get('propertyImages')?.setValue(this.uploadedFiles);
  }

  onSelectCoverImage($event: FileSelectEvent) {
    this.propertyForm.get('coverImage')?.setValue($event.files[0]);
  }
}
