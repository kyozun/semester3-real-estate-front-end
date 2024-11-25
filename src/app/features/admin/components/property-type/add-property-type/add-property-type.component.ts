import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Button } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { YtPlayerComponent } from '../../../../../shared/components/yt-player/yt-player.component';
import { delay, Observable, tap } from 'rxjs';
import { PropertyTypeService } from '../../../../property/services/property-type.service';
import { PropertyType } from '../../../../../shared/models/property-type';
import { CreatePropertyType } from '../../../models/create-property-type';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-property-type',
  standalone: true,
  imports: [AsyncPipe, Button, CurrencyPipe, DropdownModule, EditorModule, FileUploadModule, FormsModule, InputGroupAddonModule, InputGroupModule, InputTextModule, ReactiveFormsModule, SkeletonModule, TagModule, ToastModule, YtPlayerComponent],
  templateUrl: './add-property-type.component.html',
  styleUrl: './add-property-type.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPropertyTypeComponent implements OnInit {
  propertyTypeForm: FormGroup;
  private propertyTypeService = inject(PropertyTypeService);
  propertyTypes$: Observable<PropertyType[]> = this.propertyTypeService.getPropertyTypes$();
  private formBuilder = inject(FormBuilder);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  ngOnInit(): void {
    this.propertyTypeService.getPropertyTypes();

    this.propertyTypeForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  submitForm() {
    const formValues = this.propertyTypeForm.value;

    const payload: CreatePropertyType = {
      name: formValues.name,
    };

    this.propertyTypeService
      .createPropertyType(payload)
      .pipe(
        tap(() =>
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Create Successfully',
          })
        )
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/admin/property-type']);
        },
        error: () => {},
      });
  }

  clearForm() {
    this.propertyTypeForm.reset();
  }
}
