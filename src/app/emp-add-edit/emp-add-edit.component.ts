import { Component, Inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_FORM_FIELD, MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatCalendar, MatDatepickerContent, MatDatepickerModule } from '@angular/material/datepicker'
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { DialogRef } from '@angular/cdk/dialog';
import { HttpClientModule } from '@angular/common/http';
import { SendDataService } from '../services/send-data.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,MatButtonModule, MatNativeDateModule, DatePipe,
    FormsModule, ReactiveFormsModule, MatIconModule,MatDatepickerModule ,MatRadioModule ,MatSelectModule, HttpClientModule],
  providers: [SendDataService,DatePipe,MatDatepickerModule,{provide:MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue:{appearance:'outline'}}],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss',
})
export class EmpAddEditComponent  implements OnInit {
[x: string]: any;
email = new FormControl('', [Validators.required, Validators.email])

  empForm!: FormGroup;

  constructor(private fb: FormBuilder, public sendDataService: SendDataService, private dialogRef: MatDialogRef<EmpAddEditComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private coreService: CoreService,
    ) {
    this.getValueFromForm()
  }
  ngOnInit(): void {
    console.log(this.empForm)
    this.empForm.patchValue(this.data)
  }
;
  getValueFromForm() {
    this.empForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      gender: '',
      education: '',
      company: '',
      experiences: '',
      package: '',

    });
  }


  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data){
        this.sendDataService.updateEmployee(this.data.id ,this.empForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Employee detail updated!',);
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
  
          },
        });
      }else{
        this.sendDataService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            // alert(' ');
            this.coreService.openSnackBar('Employee added successfully',);
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
  
          },
        });
      }
    };
  };
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
};
