import { Component, OnInit, ViewChild } from '@angular/core';
import { AppServiceService } from 'src/services/app-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ProductAdminDialogComponent } from './product-admin-dialog/product-admin-dialog.component';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { SnackbarService } from '../shared/snackbar.service';
import { MatSort } from '@angular/material/sort';

export interface InventoryListElement {
  name: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit {

  addProductAdminDialogRef: MatDialogRef<ProductAdminDialogComponent>;
  displayedColumns: string[] = ['name', 'description', 'price', 'action'];
  newEvent: PageEvent;
  pageSize: number = 5;
  length: number = 0;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 20];
  inventoryList: any;
  dataSource = new MatTableDataSource<InventoryListElement>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private snackBar: SnackbarService, private httpService: AppServiceService,
    private dialog: MatDialog, private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.getDataFromService(this.newEvent);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addNew() {
    this.addProductAdminDialogRef = this.dialog.open(ProductAdminDialogComponent, {
      minHeight: '100px',
      maxWidth: '400px'
    });
    this.addProductAdminDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDataFromService(this.newEvent);
      }
    });
  }

  getDataFromService(event: PageEvent) {
    this.httpService.getData('http://localhost:3000/inventory')
      .subscribe(result => {
        this.inventoryList = result;
        this.dataSource = new MatTableDataSource<InventoryListElement>(this.inventoryList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
        (error) => {
          this.snackBar.showSnackBar('something went wrong', '', 'error');
        });
  }

  getRowData(row) {
    this.addProductAdminDialogRef = this.dialog.open(ProductAdminDialogComponent, {
      minHeight: '100px',
      maxWidth: '400px',
      data: row
    });
    this.addProductAdminDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDataFromService(this.newEvent);
      }
    });
  }

  DeleteRowData(row) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      minHeight: 'auto',
      maxWidth: '400px',
      data: 'Are you sure want to delete'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.httpService.deleteData('http://localhost:3000/inventory', row.id)
          .subscribe(() => {
            this.snackbar.showSnackBar('inventory list deleted successfullt', '', 'success')
            this.getDataFromService(this.newEvent);
          }, (error) => {
            this.snackBar.showSnackBar('something went wrong', '', 'error');
          });
      }
    });
  }
}
