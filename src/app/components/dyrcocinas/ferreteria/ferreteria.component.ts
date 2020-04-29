import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Ferreteria } from '../../../models/dyrcocinas/ferreteria.model';
import { FerreteriaService } from '../../../services/dyrcocinas/ferreteria.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-ferreteria',
  templateUrl: './ferreteria.component.html',
  styleUrls: ['./ferreteria.component.css']
})
export class FerreteriaComponent implements OnInit {

  displayedColumns: string[] = ['num', 'nombre', 'precio', 'proveedor', 'descripcion', '_id'];
  dataSource: MatTableDataSource<Ferreteria>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public ferreterias: Ferreteria[];

  constructor(private titleService: Title,public dialog: MatDialog, private _ferreteriaService: FerreteriaService, private paginatorleng: MatPaginatorIntl) {
    this.paginatorleng.itemsPerPageLabel = "Registros por página";
    this.paginatorleng.getRangeLabel = this.changeLenguage();
    this.titleService.setTitle( 'Ferretería' );

  }

  ngOnInit(): void {
    this.getFerreterias();
  }

  openModal(row, flagShowButton) {
    const dialogRef = this.dialog.open(ModalDialogFerreteria, {
      width: '240px',
      data: [row, flagShowButton]
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result==null){
        return
      } else
      if (result !== false ) {
        this.getFerreterias();
        // console.log('The dialog was closed', result);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changeLenguage() {
    const dutchRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length == 0 || pageSize == 0) { return `0 de ${length}`; }

      length = Math.max(length, 0);

      const startIndex = page * pageSize;

      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;

      return `${startIndex + 1} - ${endIndex} de ${length}`;
    }

    return dutchRangeLabel

  }

  getFerreterias() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.ferreterias = []
    this._ferreteriaService.getFerreterias().subscribe(
      response => {
        if (response.ferreterias) {
          let num = 1
          response.ferreterias.forEach((element) => {
            element['num'] = num++;
            this.ferreterias.push(element)
          });;
          this.dataSource = new MatTableDataSource(this.ferreterias);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          Swal.close();
        }
      },
      error => {
        console.log(<any>error)
        Swal.fire({
          title: 'Error de conexión',
          icon: 'error',
          text: error.message,
          showConfirmButton: true,
          allowOutsideClick: false,
          confirmButtonText:'Intentar Nuevamente'
        }).then((result)=>{
          Swal.showLoading();
          this.ngOnInit();
        });
      }
    );
  }

  deleteFerreteria(_id) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Desea borrar la Ferreteria?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this._ferreteriaService.deleteFerreteria(_id).subscribe(() => {
          this.getFerreterias();
          setTimeout(() => {
            Swal.fire({
              title: 'Ferretería Eliminada',
              icon: 'success',
              showConfirmButton: true
            })
          }, 800);
        }, error => {
          console.log(<any>error)
          Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error'
          })
        }
        )
      }
    }
    );
  }
}

// -------------------------------------------------TS MODAL--------------------------------------------------------------
@Component({
  selector: 'app-modal',
  templateUrl: 'modal-ferreteria.component.html',
})
export class ModalDialogFerreteria implements OnInit {

  updateFormGroup: FormGroup;
  showInputId = false;
  showActionButton: boolean;

  constructor(
    private _ferreteriaService: FerreteriaService, private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalDialogFerreteria>,
    @Inject(MAT_DIALOG_DATA) public data: [any, boolean]) {
    this.showActionButton = data[1];
  }

  ngOnInit(): void {
    this.updateFormCapture();
  }

  updateFormCapture() {
    this.updateFormGroup = this._formBuilder.group({
      _id: new FormControl({ value: this.data[0]._id, disabled: true }),
      nombre: [this.data[0].nombre, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      precio: [this.data[0].precio, [Validators.required, Validators.minLength(1), Validators.maxLength(8), Validators.pattern("^[0-9]*$")]],
      proveedor: [this.data[0].proveedor, [Validators.maxLength(50)]],
      descripcion: [this.data[0].descripcion, [Validators.maxLength(500)]]
    });
  }

  saveFerreteria() {
    this._ferreteriaService.saveFerreteria(this.updateFormGroup.value).subscribe(
      resp => {
        setTimeout(() => {
          Swal.fire({
            text: 'Se guardó correctamente',
            icon: 'success'
          })
        }, 800);

        this.dialogRef.close(true);
      }, error => {
        if (error.error.message.code === 11000) {
          Swal.fire({
            text: "El nombre ya existe",
            icon: 'error'
          })
        } else {
          Swal.fire({
            text: error.error.message,
            icon: 'error'
          })
          this.dialogRef.close(false);
          console.log(error)
        }
      }
    )
  }

  updateFerreteria() {
    let updateFerreteria = this.updateFormGroup.value;
    this._ferreteriaService.putFerreteria(this.data[0]._id, updateFerreteria).subscribe(
      resp => {
        setTimeout(() => {
          Swal.fire({
            text: 'Se actualizó correctamente',
            icon: 'success'
          })
        }, 800);
        this.dialogRef.close(true);
      }, error => {
        Swal.fire({
          text: error.message,
          icon: 'error'
        })
        this.dialogRef.close(false);
        console.log(error)
      }
    )
  }

  onClose(): void {
    this.dialogRef.close(false);
  }

}
