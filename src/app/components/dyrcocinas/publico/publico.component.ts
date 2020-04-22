import { Component, OnInit } from '@angular/core';
import { GalleryItem, ImageItem } from '@ngx-gallery/core';
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

  constructor(private titleService: Title) {
   
   }

 

    ngOnInit(): void {
      this.titleService.setTitle('D&R Cocinas');
   
   

        // Set gallery items array
     this.items = [
      new ImageItem({ src: '../../../../assets/images/dyrcocinas/6.jpeg', thumb: '../../../../assets/images/dyrcocinas/6.jpeg'}),
      new ImageItem({ src: '../../../../assets/images/dyrcocinas/5.jpeg', thumb: '../../../../assets/images/dyrcocinas/5.jpeg' }),
      new ImageItem({ src: '../../../../assets/images/dyrcocinas/8.jpeg', thumb: '../../../../assets/images/dyrcocinas/8.jpeg' }),
      new ImageItem({ src: '../../../../assets/images/dyrcocinas/9.jpeg', thumb: '../../../../assets/images/dyrcocinas/9.jpeg' }),
      new ImageItem({ src: '../../../../assets/images/dyrcocinas/11.jpeg', thumb: '../../../../assets/images/dyrcocinas/11.jpeg' }),
      new ImageItem({ src: '../../../../assets/images/dyrcocinas/12.jpeg', thumb: '../../../../assets/images/dyrcocinas/12.jpeg' }),

      

   
    ];

    }
  
  
}
