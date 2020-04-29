import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ColorMadecor } from '../../../models/dyrcocinas/colorMadecor.model';
import { ColorMadecorService } from '../../../services/dyrcocinas/colorMadecor.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-color-madecor',
  templateUrl: './color-madecor.component.html',
  styleUrls: ['./color-madecor.component.css']
})
export class ColorMadecorComponent implements OnInit {

  displayedColumns: string[] = ['num', 'nombre', 'precio', 'proveedor', 'descripcion', '_id'];
  dataSource: MatTableDataSource<ColorMadecor>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public colorMadecors: ColorMadecor[];
  constructor(private titleService: Title,public dialog: MatDialog, private _colorMadecorService: ColorMadecorService, private paginatorleng: MatPaginatorIntl) {
    this.paginatorleng.itemsPerPageLabel = "Registros por página";
    this.paginatorleng.getRangeLabel = this.changeLenguage();
    this.titleService.setTitle( 'ColorMadecor' );
  }


  ngOnInit(): void {
    this.getColorMadecors();
  }

  openModal(row, flagShowButton) {
    const dialogRef = this.dialog.open(ModalDialogColorMadecor, {
      width: '240px',
      data: [row, flagShowButton]
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result==null){
        return
      } else
      if (result !== false ) {
        this.getColorMadecors();
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

  getColorMadecors() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.colorMadecors = []
    this._colorMadecorService.getColorMadecors().subscribe(
      response => {
        if (response.colorMadecors) {
          let num = 1
          response.colorMadecors.forEach((element) => {
            element['num'] = num++;
            this.colorMadecors.push(element)
          });;
          this.dataSource = new MatTableDataSource(this.colorMadecors);
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
          confirmButtonText: 'Intentar Nuevamente'
        }).then((result) => {
          Swal.showLoading();
          this.ngOnInit();
        });
      }
    );
  }

  deleteColorMadecor(_id) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Desea borrar el ColorMadecor?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this._colorMadecorService.deleteColorMadecor(_id).subscribe(() => {
          this.getColorMadecors();
          setTimeout(() => {
            Swal.fire({
              title: 'ColorMadecor Eliminado',
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



// -------------------------------------------------TS MODAL
@Component({
  selector: 'app-modal',
  templateUrl: 'modal-color.component.html',
})
export class ModalDialogColorMadecor implements OnInit {

  updateFormGroup: FormGroup;
  showInputId = false;
  showActionButton: boolean;
  constructor(
    private _colorMadecorService: ColorMadecorService, private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalDialogColorMadecor>,
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
      precio: [this.data[0].precio, [Validators.required, Validators.minLength(0), Validators.maxLength(8), Validators.pattern("^[0-9]*$")]],
      proveedor: [this.data[0].proveedor, [Validators.maxLength(50)]],
      descripcion: [this.data[0].descripcion, [Validators.maxLength(500)]]
    });
  }

  saveColorMadecor() {
    this._colorMadecorService.saveColorMadecor(this.updateFormGroup.value).subscribe(
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

  updateColorMadecor() {
    let updateColorMadecor = this.updateFormGroup.value;
    this._colorMadecorService.putColorMadecor(this.data[0]._id, updateColorMadecor).subscribe(
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