import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavComponent } from '../nav/nav.component';
import { ActivatedRoute } from '@angular/router';
import { RealEstateService } from '../services/real-estate.service';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-real-estate-list',
  standalone: true,
  imports: [FooterComponent, NavComponent, NgIf, AsyncPipe, CurrencyPipe, AvatarModule],
  templateUrl: './real-estate-list.component.html',
  styleUrl: './real-estate-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RealEstateListComponent implements OnInit {
  query: string = '';
  page: number = 1;
  private route = inject(ActivatedRoute);
  private realEstateService = inject(RealEstateService);
  realEstates$: Observable<any[]> = this.realEstateService.realEstates$;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.query = params['query'] || '';
      this.page = +params['page'] || 1;

      // Use this.query and this.page to fetch or filter data
      this.searchData(this.query, this.page);
    });

    this.getRealEstates('phone');
  }

  searchData(query: string, page: number) {
    // Fetch or filter data based on query and page
    console.log('Searching for:', query, 'Page:', page);
  }

  getRealEstates(query: string): void {
    this.realEstateService.getRealEstates(query);
  }
}
