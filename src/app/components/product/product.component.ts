import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() item: any = null;
  @Output() window = new EventEmitter<string>();
  photoUrl: any = null;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    let photos = JSON.parse((this.item as any).fotos);
    this.photoUrl = photos.photosUrl[0];
    console.log(this.photoUrl);
  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

}
