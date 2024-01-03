import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';







@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatNativeDateModule, 
    FormsModule, ReactiveFormsModule, MatIconModule,MatRadioModule,MatSelectModule ],

  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss',
})
export class EmpAddEditComponent {
  
}
