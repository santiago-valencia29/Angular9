import { Component, OnInit,ViewChild } from '@angular/core';
import { Project } from '../../../models/project.model';
import { ProjectService } from '../../../services/meanstack/project.service';
import { global } from '../../../services/meanstack/global';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})


export class ProjectsComponent implements OnInit {
  displayedColumns: string[] = ['_id', 'name', 'description', 'symbol'];
  dataSource: MatTableDataSource<Project>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  public projects: Project[];
  constructor(private _projectService: ProjectService) { 
  
  }

  ngOnInit(): void {
   

    this.getProjects();
  }

  getProjects(){
    this._projectService.getProjects().subscribe(
      response => {
        if(response.projects){
          this.projects= response.projects;
          this.dataSource = new MatTableDataSource(this.projects);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(this.projects)
        }
       
      },
      error => {
        console.log(<any>error)
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
  


}
const ELEMENT_DATA: Project[] = [
  {_id: "1", name: 'Hydrogen', description: "1.0079", category: 'H', year: 2014 ,langs: 'lenguajes', image: null},
  {_id: "1", name: 'Hydrogen', description: "1.0079", category: 'H', year: 2014 ,langs: 'lenguajes', image: null},
  {_id: "1", name: 'Hydrogen', description: "1.0079", category: 'H', year: 2014 ,langs: 'lenguajes', image: null},
  {_id: "1", name: 'Hydrogen', description: "1.0079", category: 'H', year: 2014 ,langs: 'lenguajes', image: null},
];

// function createNewUser(id: number): UserData {
//   const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//       NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//   return {
//     id: id.toString(),
//     nombre: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
//   };
// }

