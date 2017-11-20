import { Component } from '@angular/core';

import { ParamsService } from '../shared/params.service';
import { SearchService } from '../shared/Search.service';

@Component({
  selector: 'searchresults',
  templateUrl: './searchResults.template.html',
  styleUrls: ['./searchResults.style.scss']
})

export class SearchResultsComponent {

  paramsSub: any;
  params: any;
  searching: boolean = false;

  constructor (private _ParamsService: ParamsService,
               private _SearchService: SearchService) {
    this.paramsSub = this._ParamsService.paramsObs.subscribe(params => {
      if (params) {

      let searchPath = (params.path.split('/').pop()).split('?tab=');

      this.searchFor(searchPath[0], searchPath[1]);

      }
    });
  }

  ngOnDestroy() {
    if (this.paramsSub) {
      this.paramsSub.unsubscribe();
    }
  }

  searchFor(keyword: string, tab: string) {

    if (this.searching || !keyword) return;
    this.searching = true;

    this._SearchService.search(keyword, tab)
     .then(results => {
       console.log(results)})
     .catch(error => console.error(error))
     .finally(() => this.searching = false);
  }
}
