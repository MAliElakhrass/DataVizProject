import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { ClusteringConfig } from '../../graph-configuration';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() config: ClusteringConfig;

  private self = {
    search: function() {},
    reset: function() {}
  };
  private isSearching: boolean;

  constructor() {
    this.isSearching = false;
    this.self.search = function() {};
    this.self.reset = function() {};
  }

  ngOnInit(): void {
    this.autoComplete();
    this.searchEvent();
  }

  private autoComplete(): void {
  }

  private searchEvent(): void  {
    let searchBarInput = d3.select("#search-bar input");
    searchBarInput.on("keydown", d => {
      if (d3.event.key == "Enter") {
        this.validateInput();
      } else {
        this.isSearching = false;
        this.self.reset();
        searchBarInput.classed("error", false);
      }
    });

    d3.select("#search-bar button")
      .on("click", this.validateInput);
  }

  private validateInput(): void {
    let searchBarInput = d3.select("#search-bar input");
    if (this.isSearching) {
      return;
    }

    function normalize(str) {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    let value = (searchBarInput.node() as HTMLInputElement).value.toLowerCase();
    if (!value) {
      return;
    }
    let currentValue = normalize(value);
    
    const valueFound = this.config.dataset.find(function(game) {
      return normalize(game.Name.toLowerCase()) === currentValue;
    });
    
    if (valueFound) {
      this.isSearching = true;
      console.log('found');
      // self.search(valueFound.id, valueFound.name);
    } else {
      console.log('not found');
      this.isSearching = false;
      // this.self.reset();
      searchBarInput.classed("error", true);
    }
  }

}
