import { Component, OnInit } from '@angular/core';
import { GalleryItem, ImageItem } from '@ngx-gallery/core';
import { style } from '@angular/animations';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-private-tasks',
  templateUrl: './private-tasks.component.html',
  styleUrls: ['./private-tasks.component.css']
})
export class PrivateTasksComponent implements OnInit {

  images: GalleryItem[
    
  ];
  flagAlbum = false;
  infoButton = "Abrir Álbum";
  video = false;

  ngOnInit() {
     // Set gallery items array
     this.images = [
      new ImageItem({ src: '../../../../assets/images/private/1.jpg', thumb: '../../../../assets/images/private/1.jpg'}),
      new ImageItem({ src: '../../../../assets/images/private/2.jpeg', thumb: '../../../../assets/images/private/2.jpeg' }),
      new ImageItem({ src: '../../../../assets/images/private/3.jpg', thumb: '../../../../assets/images/private/3.jpg' }),
      new ImageItem({ src: '../../../../assets/images/private/4.jpg', thumb: '../../../../assets/images/private/4.jpg' })


      // ... more items
    ];
  
  }

  openGallery(){
    this.flagAlbum=!this.flagAlbum;
    if(this.flagAlbum){
      this.infoButton = "Cerrar Álbum"
    }else{
      this.infoButton = "Abrir Álbum"
    }
  }

  showDialog(){
    Swal.fire({
      title: 'Gracias por estar en mi vida',
      confirmButtonText: 'Seleccionar'
    })
    this.flagAlbum = !this.flagAlbum;
    this.infoButton = "Abrir Álbum"
    this.video = true;

  }

}


