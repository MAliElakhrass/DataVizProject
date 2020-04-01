import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';

export interface CorrMatrix {
  value: number;
  x: string;
  y: string;
}

@Injectable({
  providedIn: 'root'
})
export class CorrelationDataService {

  private PATH_DATA = ['assets/data/corr_matrix.csv', 'assets/data/videogames.csv'];

  public correlationData: Promise<CorrMatrix[]>;

  constructor(private http: HttpClient) {
    this.correlationData = this.readData(this.PATH_DATA[0]);
  }

  private readData(path: string): Promise<CorrMatrix[]> {
    return this.http.get(path, { responseType: 'text' }).toPromise().then(results => {
      return d3.csvParse(results, function(d) {
        return {
          value: parseFloat(d.V),
          x: d.x,
          y: d.y
        }
      });
    });
  }
}
