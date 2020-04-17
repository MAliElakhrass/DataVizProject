import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ClusteringConfig } from '../../graph-configuration';
import * as d3 from 'd3';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() config: ClusteringConfig;
  @Output() zoomBubbleChart = new EventEmitter;

  private isSearching: boolean;

  constructor() {
    this.isSearching = false;
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
        searchBarInput.classed("error", false);
      }
    });

    d3.select("#search-bar button")
      .on("click", d => {this.validateInput()});
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
      if (normalize(game.Name.toLowerCase()) === currentValue) {
        return game;
      } else {
        return null;
      }
    });
    
    if (valueFound) {
      this.isSearching = true;
      let index = this.config.dataset.indexOf(valueFound);
      this.zoomBubbleChart.emit(index.toString());
    } else {
      this.isSearching = false;
      searchBarInput.classed("error", true);
    }
  }

}
