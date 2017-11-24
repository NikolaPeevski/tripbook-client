import { Component, Input, Output } from '@angular/core';


@Component({
  selector: 'searchresults',
  templateUrl: './searchResult.template.html',
  styleUrls: ['../searchResults.style.scss']
})

export class SearchResultComponent {

  @Input() result: any;

  constructor () {}
}
