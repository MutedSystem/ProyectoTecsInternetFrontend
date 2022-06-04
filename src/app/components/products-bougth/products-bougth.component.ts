import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { BuyService } from './../../services/buy.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-bougth',
  templateUrl: './products-bougth.component.html',
  styleUrls: ['./products-bougth.component.css']
})
export class ProductsBougthComponent implements OnInit {

  buys:any = null;

  constructor(private buyService: BuyService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.buyService.seeBuy().subscribe((result) => {
      this.buys = (result as any).boughtsJson;
      console.log(this.buys);
      
    },(error) => {
      console.error(error);
    });
  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

}
