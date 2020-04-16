import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ProjectService } from '../../../services/meanstack/project.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { BehaviorSubjectService } from 'src/app/services/behavior-subject.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-color-madecor',
  templateUrl: './color-madecor.component.html',
  styleUrls: ['./color-madecor.component.css']
})
export class ColorMadecorComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openModal(row) {
    const dialogRef = this.dialog.open(ModalDialogColor, {
      width: '400px',
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      console.log('The dialog was closed', result);
    });
  }


}


// -------------------------------------------------TS MODAL
@Component({
  selector: 'app-modal',
  templateUrl: 'modal-color.component.html',
})
export class ModalDialogColor implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalDialogColor>,
    @Inject(MAT_DIALOG_DATA) public data: Project) { }


  ngOnInit(): void {


  }

}