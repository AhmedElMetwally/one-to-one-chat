import { Component, OnInit  } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent  {
  blankImgPath: string;

  constructor(){
    
    // blank image path
    this.blankImgPath = '../../assets/slider-pro-master/src/css/images/blank.gif';

    // slider confid
    $( document ).ready(function( $ ) {
      $( '#example1' ).sliderPro({
        width: 960,
        height: 500,
        arrows: true,
        buttons: true,
        waitForLayers: true,
        thumbnailWidth: 200,
        thumbnailHeight: 100,
        thumbnailPointer: true,
        autoplay: false,
        autoScaleLayers: false,
        breakpoints: {
          500: {
            thumbnailWidth: 120,
            thumbnailHeight: 50
          }
        }
      });
    });
    // end slider confid
  

  };


}