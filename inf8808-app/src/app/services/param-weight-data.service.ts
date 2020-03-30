import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as d3 from 'd3';

export interface ParamWeight {
  parameter: string;
  weight: number;
}

@Injectable()
export class ParamWeightDataService {

  private PATH_DATA = ['assets/data/weights_nonsale.csv', 'assets/data/weights_sale.csv'];

  public nonSaleData: Promise<ParamWeight[]>;
  public saleData: Promise<ParamWeight[]>;

  constructor(private http: HttpClient) {
    this.nonSaleData = this.readData(this.PATH_DATA[0]);
    this.saleData = this.readData(this.PATH_DATA[1])
  }

  private readData(path: string): Promise<ParamWeight[]> {
    return this.http.get(path, { responseType: 'text' }).toPromise().then(results => {
      return d3.csvParse(results, function(d) {
        return {
          parameter: d.columns,
          weight: parseFloat(d.weights)
        }
      });
    });
  }
}
