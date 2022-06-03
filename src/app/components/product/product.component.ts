import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() item : any = null;
  photoUrl : any = null;

  constructor() { }

  ngOnInit(): void {
    let photos = JSON.parse((this.item as any).fotos);
    this.photoUrl = photos.photosUrl[0];
    console.log(this.photoUrl);
    
  }

  

}
