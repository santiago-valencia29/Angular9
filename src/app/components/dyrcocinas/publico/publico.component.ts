import { Component, OnInit } from '@angular/core';
import { Gallery,GalleryItem, ImageItem } from '@ngx-gallery/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-publico',
  templateUrl: './publico.component.html',
  styleUrls: ['./publico.component.css']
})
export class PublicoComponent implements OnInit {
  
  galleryId = 'myLightbox';
  items: GalleryItem[];
  video = false;

  constructor(private titleService: Title, public gallery:Gallery) {
    this.titleService.setTitle('D&R Cocinas');
   }

 

    ngOnInit(): void {

        // Set gallery items array
     this.items = [
      new ImageItem({ src: '../../../../assets/images/dyrcocinas/6.jpeg', thumb: '../../../../assets/images/dyrcocinas/6.jpeg'}),
      new ImageItem({ src: '../../../../assets/images/private/2.jpeg', thumb: '../../../../assets/images/private/2.jpeg' }),
      new ImageItem({ src: '../../../../assets/images/private/3.jpg', thumb: '../../../../assets/images/private/3.jpg' }),
      new ImageItem({ src: '../../../../assets/images/private/4.jpg', thumb: '../../../../assets/images/private/4.jpg' })
      

   
    ];

    }
  
  
}
