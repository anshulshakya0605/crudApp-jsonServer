import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SendDataService } from '../services/send-data.service';
import { MatTableModule } from '@angular/material/table';
import { AfterViewInit, } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, HttpClientModule, MatTableModule, MatPaginatorModule, MatSortModule,],
  providers: [SendDataService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  empolyeeList: any

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'password', 'gender', 'education', 'company', 'experiences', 'package'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private empService: SendDataService) { }


  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm() {
    this.dialog.open(EmpAddEditComponent);
  }
  getEmployeeList() {
    this.empService.getEmployeeList().subscribe({
      next: (res) => {
        this.empolyeeList = res
        this.dataSource = new MatTableDataSource(this.empolyeeList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
