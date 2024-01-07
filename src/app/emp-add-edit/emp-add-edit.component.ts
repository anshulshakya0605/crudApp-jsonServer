import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { DialogRef } from '@angular/cdk/dialog';
import { HttpClientModule } from '@angular/common/http';
import { SendDataService } from '../services/send-data.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatNativeDateModule,
    FormsModule, ReactiveFormsModule, MatIconModule, MatRadioModule ,MatSelectModule, HttpClientModule],
  providers: [SendDataService],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss',
})
export class EmpAddEditComponent  implements OnInit {

  empForm!: FormGroup;

  constructor(private fb: FormBuilder, public sendDataService: SendDataService, private dialogRef: DialogRef<EmpAddEditComponent>) {
    this.getValueFromForm()
  }
  ngOnInit(): void {
    console.log(this.empForm)
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
      this.sendDataService.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
          alert('Employee added successfully');
          this.dialogRef.close();
        },
        error: (err: any) => {
          console.error(err);

        },
      });

    };
  };
};
