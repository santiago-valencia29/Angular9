import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Cliente } from '../../../models/dyrcocinas/cliente.model';
import { ClienteService } from '../../../services/dyrcocinas/cliente.service';
import { Title } from '@angular/platform-browser';
import { ColorMadecorService } from 'src/app/services/dyrcocinas/colorMadecor.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  displayedColumns: string[] = [
    '_id',
    'num',
    'estado',
    'nombre_proyecto',
    'cedula',
    'nombres_apellidos',
    'telefono',
    'celular',
    'correo',
    'ciudad',
    'sector',
    'direccion',
    'medidas',
    'color_madekor_REL',
    'color_combinado_REL',
    'precio',
    'anticipo_70',
    'resta_cliente',
    'fecha_inicio_proyecto',
    'fecha_entrega_proyecto',
    'fecha_garantia_proyecto',
    'desc_garantia'
  ];
  dataSource: MatTableDataSource<Cliente>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public clientes: Cliente[];

  constructor(
    private titleService: Title, public dialog: MatDialog,
    private _clienteService: ClienteService,
    private paginatorleng: MatPaginatorIntl) {
    this.paginatorleng.itemsPerPageLabel = 'Registros por página';
    this.paginatorleng.getRangeLabel = this.changeLenguage();
    this.titleService.setTitle('Clientes');
  }

  ngOnInit(): void {
    this.getClientes();

  }

  openModal(row, flagShowButton) {
    const dialogRef = this.dialog.open(ModalDialogCliente, {
      width: '700px',
      height: '600px',
      data: [row, flagShowButton]
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == null) {
        return;
      } else
        if (result !== false) {
          this.getClientes();
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
      if (length === 0 || pageSize === 0) { return `0 de ${length}`; }

      length = Math.max(length, 0);

      const startIndex = page * pageSize;

      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;

      return `${startIndex + 1} - ${endIndex} de ${length}`;
    };

    return dutchRangeLabel;

  }

  getClientes() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.clientes = [];
    this._clienteService.getClientes().subscribe(
      response => {
        if (response.clientes) {
          let num = 1;
          response.clientes.forEach((element) => {
            element.num = num++;
            this.clientes.push(element);
          });
          this.dataSource = new MatTableDataSource(this.clientes);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          Swal.close();
        }
      },
      error => {
        console.log(error);
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

  deleteCliente(_id: string) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Desea borrar el Cliente?`,
      icon: 'question',
      cancelButtonText: 'Cancelar',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this._clienteService.deleteCliente(_id).subscribe(() => {
          this.getClientes();
          setTimeout(() => {
            Swal.fire({
              title: 'Cliente Eliminado',
              icon: 'success',
              showConfirmButton: true
            });
          }, 800);
        }, error => {
          console.log(error);
          Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error'
          });
        }
        );
      }
    }
    );
  }

}




// -------------------------------------------------TS MODAL
interface Estado {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: 'modal-cliente.component.html',
})


// tslint:disable-next-line: component-class-suffix
export class ModalDialogCliente implements OnInit {

  updateFormGroup: FormGroup;
  showInputId = false;
  showActionButton: boolean;
  labelPrecio = 0;

  estados: Estado[] = [
    { value: '1', viewValue: 'En Espera' },
    { value: '2', viewValue: 'En Proceso' },
    { value: '3', viewValue: 'Cierre' },
    { value: '4', viewValue: 'Descartado' },
  ];

  colores: any;

  constructor(
    private _colorMadecorService: ColorMadecorService, private _clienteService: ClienteService, private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalDialogCliente>,
    @Inject(MAT_DIALOG_DATA) public data: [Cliente, boolean]) {
    this.showActionButton = data[1];

  }


  ngOnInit(): void {
    this.getListColors();
    this.updateFormCapture();


  }

  onSearchChange(searchValue: number): void {
    this.labelPrecio = searchValue;
  }

  getListColors() {
    this._colorMadecorService.getColorMadecors().subscribe(
      resp => {
        this.colores = resp.colorMadecors;
      }, error => {
        console.log(error);
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
      });
  }

  updateFormCapture() {
    this.updateFormGroup = this._formBuilder.group({
      _id: new FormControl({ value: this.data[0]._id, disabled: true }),
      estado: [this.data[0].estado, [Validators.required]],
      nombre_proyecto: [this.data[0].nombre_proyecto, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      cedula: [this.data[0].cedula, [Validators.maxLength(11)]],
      nombres_apellidos: [this.data[0].nombres_apellidos, [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      telefono: [this.data[0].telefono, [Validators.maxLength(9), Validators.pattern('^[0-9]*$')]],
      celular: [this.data[0].celular, [Validators.minLength(1), Validators.maxLength(11), Validators.pattern('^[0-9]*$')]],
      correo: [this.data[0].correo, [Validators.maxLength(30)]],
      ciudad: [this.data[0].ciudad, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      sector: [this.data[0].sector, [Validators.maxLength(20)]],
      direccion: [this.data[0].direccion, [Validators.maxLength(35)]],
      medidas: [this.data[0].medidas, [Validators.maxLength(30)]],
      color_madekor_REL: [this.data[0].color_madekor_REL],
      color_combinado_REL: [this.data[0].color_combinado_REL],
      precio: [this.data[0].precio],
      fecha_inicio_proyecto: [this.data[0].fecha_inicio_proyecto],
      fecha_entrega_proyecto: [this.data[0].fecha_entrega_proyecto],
      fecha_garantia_proyecto: [this.data[0].fecha_garantia_proyecto],
      desc_garantia: [this.data[0].desc_garantia]
    });
  }

  saveCliente() {
    this._clienteService.saveCliente(this.updateFormGroup.value).subscribe(
      resp => {
        setTimeout(() => {
          Swal.fire({
            text: 'Se guardó correctamente',
            icon: 'success'
          });
        }, 800);

        // console.log(resp)
        this.dialogRef.close(true);
      }, error => {
        if (error.error.message.code === 11000) {
          Swal.fire({
            text: 'La Cédula ya existe',
            icon: 'error'
          });
        } else {
          Swal.fire({
            text: error.error.message,
            icon: 'error'
          });
          this.dialogRef.close(false);
          console.log(error);
        }
      }
    );
  }

  updateCliente() {
    const updateCliente = this.updateFormGroup.value;
    this._clienteService.putCliente(this.data[0]._id, updateCliente).subscribe(
      resp => {
        setTimeout(() => {
          Swal.fire({
            text: 'Se actualizó correctamente',
            icon: 'success'
          });
        }, 800);
        console.log(resp);
        this.dialogRef.close(true);
      }, error => {
        Swal.fire({
          text: error.message,
          icon: 'error'
        });
        this.dialogRef.close(false);
        console.log(error);
      }
    );
  }

  onClose(): void {
    this.dialogRef.close(false);
  }

}
