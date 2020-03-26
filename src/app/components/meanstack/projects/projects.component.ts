import { Component, OnInit,ViewChild } from '@angular/core';
import { Project } from '../../../models/project.model';
import { ProjectService } from '../../../services/meanstack/project.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator,MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})


export class ProjectsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'category', 'year', 'langs','_id'];
  dataSource: MatTableDataSource<Project>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public projects: Project[];
  loading: boolean;

  constructor(private _projectService: ProjectService, private paginatorleng: MatPaginatorIntl) { 

    this.paginatorleng.itemsPerPageLabel = "Registros por página";
    this.paginatorleng.getRangeLabel = this.changeLenguage();

  }

  ngOnInit(): void {
   

    this.getProjects();
  }


  getProjects(){
    this._projectService.getProjects().subscribe(
      response => {
        if(response.projects){
          this.loading = true;
          this.projects= response.projects;
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

  borrarproject(_id){
    Swal.fire({
      title:'¿Está seguro?',
      text:`Desea borrar a el proyecto?`,
      icon:'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp=>{
      if (resp.value){

        this._projectService.deleteProject(_id).subscribe(response =>{
          // console.log(response)
          Swal.fire({
            title:'Proyecto Eliminado',
            icon:'success',
            showConfirmButton:true
          })
          this.getProjects();
        },
          error => {
            console.log(<any>error)
            Swal.fire({
              title:'Error',
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
  
  changeLenguage(){
    const dutchRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length == 0 || pageSize == 0) { return `0 van ${length}`; }
      
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

}


