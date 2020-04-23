import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Cotizacion } from '../../../models/dyrcocinas/cotizacion.model';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { ClienteService } from 'src/app/services/dyrcocinas/cliente.service';
import { Cliente } from '../../../models/dyrcocinas/cliente.model';
import { ActivatedRoute } from '@angular/router';
import { ColorMadecorService } from '../../../services/dyrcocinas/colorMadecor.service';
import { ColorMadecor } from 'src/app/models/dyrcocinas/colorMadecor.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cotizacion-madera',
  templateUrl: './cotizacion-madera.component.html',
  styleUrls: ['./cotizacion-madera.component.css']
})
export class CotizacionMaderaComponent implements OnInit {

  showButtonSave = false;
  dataCotiMadera: Cotizacion[] = [];
  displayedColumns: string[] = ['select', 'nombre', 'precio_unitario', 'cantidad', 'costo_total'];
  dataSource = new MatTableDataSource<Cotizacion>(this.dataCotiMadera);
  selection = new SelectionModel<Cotizacion>(true, []);
  cliente: Cliente;
  id_cliente: string;
  maderas: ColorMadecor[];
  madera: ColorMadecor;
  nombres_apellidos: string;
  celular: string;
  nombre_proyecto: string;
  estado: string;
  medidas: string;

  precio: number;
  cantidad: number;
  totalArticulo: number;
  granTotal = 0;
  constructor(private titleService:Title,private route: ActivatedRoute, private _clienteService: ClienteService, private _maderaService: ColorMadecorService) { 
    this.titleService.setTitle('Cotización Ferretería');
  }

  ngOnInit(): void {
    this.id_cliente = this.route.snapshot.paramMap.get('id');

    this._maderaService.getColorMadecors().subscribe(resp => {
      this.maderas = resp.colorMadecors;
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
    }
    );


    this._clienteService.getCliente(this.id_cliente).subscribe(
      resp => {
        console.log(resp)
        this.cliente = resp.cliente;
        this.nombres_apellidos = resp.cliente.nombres_apellidos;
        this.celular = resp.cliente.celular;
        this.nombre_proyecto = resp.cliente.nombre_proyecto;
        this.estado = resp.cliente.estado;
        this.medidas = resp.cliente.medidas;
        this.dataCotiMadera = resp.cliente.coti_madecor;
        
        this.dataSource = new MatTableDataSource<Cotizacion>(this.dataCotiMadera);





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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  saveCotizacion() {

    this.cliente.coti_madecor = this.dataCotiMadera;
    this._clienteService.putCliente(this.id_cliente, this.cliente).subscribe(
      resp => {
        Swal.fire({
          text: 'Se actualizó correctamente',
          icon: 'success'
        });
        this.showButtonSave = false;
      }, error => {
        Swal.fire({
          text: error.message,
          icon: 'error'
        });
        console.log(error);
      }
    );
  }

  addCotizacion(form: NgForm) {
    if (form.invalid || this.totalArticulo === 0) {
      Swal.fire({
        icon: 'warning',
        text: 'Faltan campos por llenar',
      });
      return;
    }

    this.showButtonSave = true;

    const newRowArticle = {
      nombre: form.value.madera.nombre,
      precio_unitario: this.precio,
      cantidad: this.cantidad,
      costo_total: this.totalArticulo
    };

    this.dataCotiMadera.push(newRowArticle);
    this.dataSource = new MatTableDataSource<Cotizacion>(this.dataCotiMadera);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Ok Agregado',
      showConfirmButton: false,
      timer: 900
    });
  }

  selectMadera(madera: ColorMadecor) {
    if (madera.precio == null) {

      this.cantidad = 0;
    }
    this.precio = madera.precio;
    this.totalArticulo = this.cantidad * this.precio;


  }

  calculateTotal(cantidad: number) {
    this.cantidad = cantidad;
    this.totalArticulo = this.cantidad * this.precio;

  }

  getTotalCost() {
    return this.dataCotiMadera.map(t => t.costo_total).reduce((acc, value) => acc + value, 0);
  }

  deleteRowCoti() {
    if (this.selection.selected.length === 0) {
      Swal.fire({
        icon: 'warning',
        text: 'Debes seleccionar una ferretería',
      });
    } else {
      Swal.fire({
        title: '¿Está seguro?',
        text: `Está seguro que desea borrar la Madera seleccionada?`,
        icon: 'question',
        cancelButtonText: 'Cancelar',
        showConfirmButton: true,
        showCancelButton: true
      }).then(resp => {
        if (resp.value) {
          this.selection.selected.forEach(item => {
            const index: number = this.dataCotiMadera.findIndex(d => d === item);
            this.dataCotiMadera.splice(index, 1);
            this.dataSource = new MatTableDataSource<Cotizacion>(this.dataCotiMadera);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Ok Eliminado',
              showConfirmButton: false,
              timer: 1500
            });
          });
          this.selection = new SelectionModel<Cotizacion>(true, []);
          this.showButtonSave = true;
        }
        this.selection.clear();
      });
    }



  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Cotizacion): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.nombre + 1}`;
  }

}
