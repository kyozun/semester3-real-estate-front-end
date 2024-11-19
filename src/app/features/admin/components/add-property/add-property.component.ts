import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DropdownModule } from 'primeng/dropdown';
import { Observable } from 'rxjs';
import { PropertyService } from '../../../property/services/property.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { EditorModule } from 'primeng/editor';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';

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
  propertyTypes$: Observable<any[]> = this.propertyService.propertyType$;
  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.propertyService.getPropertyType();
    this.propertyTypes$ = this.propertyService.propertyType$;
    this.propertyForm = this.formBuilder.group({
      propertyName: [, Validators.required],
      price: ['', Validators.required],
      bedroom: ['', Validators.required],
      bathroom: ['', Validators.required],
      floor: ['', Validators.required],
      propertyCategory: ['', Validators.required],
      propertyType: [''],
      description: [''],
      address: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        zip: [''],
      }),
    });
  }

  formSubmitted = false;
  submitPropertyForm() {
    this.formSubmitted = true;

    if (this.propertyForm.valid) {
      console.log(this.propertyForm.value);
    }
  }

  clearPropertyForm() {
    this.propertyForm.reset();
  }
}
