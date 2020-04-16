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
  selector: 'app-ferreteria',
  templateUrl: './ferreteria.component.html',
  styleUrls: ['./ferreteria.component.css']
})
export class FerreteriaComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openModal(row) {
    const dialogRef = this.dialog.open(ModalDialogFerreteria, {
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
  templateUrl: 'modal-ferreteria.component.html',
})
export class ModalDialogFerreteria implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalDialogFerreteria>,
    @Inject(MAT_DIALOG_DATA) public data: Project) { }


  ngOnInit(): void {


  }

}
