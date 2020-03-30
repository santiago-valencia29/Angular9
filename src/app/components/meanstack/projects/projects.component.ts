import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Project } from '../../../models/project.model';
import { ProjectService } from '../../../services/meanstack/project.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { BehaviorSubjectService } from 'src/app/services/behavior-subject.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})


export class ProjectsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'category', 'year', 'langs', '_id'];
  dataSource: MatTableDataSource<Project>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public projects: Project[];
  loading: boolean;

  constructor(public dialog: MatDialog, private _projectService: ProjectService, private paginatorleng: MatPaginatorIntl, private _behaviorSubject: BehaviorSubjectService) {

    this.paginatorleng.itemsPerPageLabel = "Registros por página";
    this.paginatorleng.getRangeLabel = this.changeLenguage();
  }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {

    this._behaviorSubject.serviceExternalBehavior(["Estuve visitando proyectos meanStack"]);

    this._projectService.getProjects().subscribe(
      response => {
        if (response.projects) {
          this.loading = true;
          this.projects = response.projects;
          this.dataSource = new MatTableDataSource(this.projects);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          // console.log(this.projects)
        }

      },
      error => {
        console.log(<any>error)

        this.loading = false;
      }
    );
  }

  deleteProject(_id) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Desea borrar a el proyecto?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {

        this._projectService.deleteProject(_id).subscribe(response => {
          // console.log(response)
          Swal.fire({
            title: 'Proyecto Eliminado',
            icon: 'success',
            showConfirmButton: true
          })
          this.getProjects();
        },
          error => {
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

  openModal(row) {
    const dialogRef = this.dialog.open(ModalDialog, {
      width: '280px',
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
  templateUrl: 'modal.component.html',
})
export class ModalDialog implements OnInit {

  editFormGroup: FormGroup;
  constructor(private _projectService: ProjectService, private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Project) { }


  ngOnInit(): void {

    this.editFormCapture();

  }

  editFormCapture() {
    this.editFormGroup = this._formBuilder.group({
      _id: new FormControl({ value: this.data._id, disabled: true }),
      name: [this.data.name, [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      description: [this.data.description, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      category: [this.data.category, [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      year: [this.data.year, [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("^[0-9]*$")]],
      langs: [this.data.langs, [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      image: ['']
      // image: ['', Validators.required]
    });

    return this.editFormGroup;
  }

  onNoClick(): void {
    let updateProject = this.editFormGroup.value

    this._projectService.putProject(this.data._id, updateProject).subscribe(
      resp => {
        Swal.fire({
          text: 'Se actualizó correctamente',
          icon: 'success'
        })
        console.log(resp)
        this.dialogRef.close(true);
      }, error => {
        Swal.fire({
          text: error,
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



