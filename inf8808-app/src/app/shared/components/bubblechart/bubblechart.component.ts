import { Component, OnInit, Input } from '@angular/core';
import { ClusteringConfig } from '../../graph-configuration';
import * as d3 from 'd3';
import TSNE from 'tsne-js';

@Component({
  selector: 'app-bubblechart',
  templateUrl: './bubblechart.component.html',
  styleUrls: ['./bubblechart.component.css']
})
export class BubblechartComponent implements OnInit {

  @Input() config: ClusteringConfig;

  private model;
  private data = [];

  constructor() { }

  ngOnInit(): void {
    this.configuration();
    console.log(this.data);
    this.createModel();
  }

  /*
  private setScale(): void {
    const scalepop = d3.scaleSqrt().domain([0, 100000]).range([0.2, 24]),
          scalecountry = d3.scaleOrdinal(d3.schemeCategory20b),
          centerx = d3.scaleLinear().range([width / 2 - height / 2 + margin, width / 2 + height / 2 - margin]),
          centery = d3.scaleLinear().range([margin, height - margin]);
  }
  */

  private configuration(): void {
    this.data = []   
    for (let i = 0; i < this.config.dataset.length; i++) {
      this.data.push([
        this.config.dataset[i]['Platform'],
        this.config.dataset[i]['Year_of_Release'],
        this.config.dataset[i]['Genre'],
        this.config.dataset[i]['Publisher'],
        this.config.dataset[i]['NA_Sales'],
        this.config.dataset[i]['EU_Sales'],
        this.config.dataset[i]['JP_Sales'],
        this.config.dataset[i]['Other_Sales'],
        this.config.dataset[i]['Critic_Count'],
        this.config.dataset[i]['Critic_Score'],
        this.config.dataset[i]['User_Score'],
        this.config.dataset[i]['User_Count'],
        this.config.dataset[i]['Developer'],
        this.config.dataset[i]['Rating'],
      ]);
    }
  }

  private createModel(): void {
    this.model = new TSNE({
      dim: 2,
      perplexity: 30.0,
      earlyExaggeration: 4.0,
      learningRate: 100.0,
      nIter: 1000,
      metric: 'euclidean'
    });
    
    this.model.init({
      data: this.data.slice(0, 10000),
      type: 'dense'
    });
     
    // `error`,  `iter`: final error and iteration number
    // note: computation-heavy action happens here
    let [error, iter] = this.model.run();
     
    // rerun without re-calculating pairwise distances, etc.
    [error, iter] = this.model.rerun();
     
    // `output` is unpacked ndarray (regular nested javascript array)
    let output = this.model.getOutput();
     
    // `outputScaled` is `output` scaled to a range of [-1, 1]
    let outputScaled = this.model.getOutputScaled();
  }

}
