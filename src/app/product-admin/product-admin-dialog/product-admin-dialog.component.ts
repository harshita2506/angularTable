import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppServiceService } from 'src/services/app-service.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-product-admin-dialog',
  templateUrl: './product-admin-dialog.component.html',
  styleUrls: ['./product-admin-dialog.component.css']
})
export class ProductAdminDialogComponent implements OnInit {
  productFormGroup: FormGroup;
  editMode: boolean;

  constructor(private getService: AppServiceService, private snackBar: SnackbarService,
    private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public row: any,
    private dialogRef: MatDialogRef<ProductAdminDialogComponent>) { }

  ngOnInit(): void {
    this.productFormGroup = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required]
    });
    if (this.row) {
      this.editMode = true;
      this.productFormGroup.controls['name'].setValue(this.row.name);
      this.productFormGroup.controls['description'].setValue(this.row.description);
      this.productFormGroup.controls['price'].setValue(this.row.price);
    }
  }

  onSubmit() {
    var param = {
      name: this.productFormGroup.value.name,
      description: this.productFormGroup.value.description,
      price: this.productFormGroup.value.price
    };
    if (this.editMode) {
      this.getService.editData('http://localhost:3000/inventory', this.row.id, param)
        .subscribe(() => {
          this.snackBar.showSnackBar('inventory list updated successfully', '', 'success');
          this.dialogRef.close(true);
        }, (error) => {
          this.snackBar.showSnackBar('something went wrong', '', 'error');
        });
    } else {
      this.getService.PostData('http://localhost:3000/inventory', param)
        .subscribe(() => {
          this.snackBar.showSnackBar('inventory list added successfully', '', 'success');
          this.dialogRef.close(true);
        }, (error) => {
          this.snackBar.showSnackBar('something went wrong', '', 'error');
        });
    }
  }

  closeDialog() {
    this.dialogRef.close(true);
  }
}
