import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';

export interface ClusteringData {
  Name: string;
  Platform: number;
  Year_of_Release: number;
  Genre: number;
  Publisher: number;
  NA_Sales: number;
  EU_Sales: number;
  JP_Sales: number;
  Other_Sales: number;
  Critic_Count: number;
  Critic_Score: number;
  User_Score: number;
  User_Count: number;
  Developer: number;
  Rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class ClusteringDataService {

  public clusteringData: Promise<ClusteringData[]>;

  constructor(private http: HttpClient) {
    this.clusteringData = this.readData();
  }

  private readData(): Promise<ClusteringData[]> {
    const PATH = 'assets/data/videogames.csv';

    return this.http.get(PATH, { responseType: 'text' }).toPromise().then(results => {
      return d3.csvParse(results, function(d) {
        return {
          Name: d.Name,
          Platform: parseFloat(d.Platform),
          Year_of_Release: parseFloat(d.Year_of_Release),
          Genre: parseFloat(d.Genre),
          Publisher: parseFloat(d.Publisher),
          NA_Sales: parseFloat(d.NA_Sales),
          EU_Sales: parseFloat(d.EU_Sales),
          JP_Sales: parseFloat(d.JP_Sales),
          Other_Sales: parseFloat(d.Other_Sales),
          Critic_Count: parseFloat(d.Critic_Count),
          Critic_Score: parseFloat(d.Critic_Score),
          User_Score: parseFloat(d.User_Score),
          User_Count: parseFloat(d.User_Count),
          Developer: parseFloat(d.Developer),
          Rating: parseFloat(d.Rating)
        }
      });
    });
  }

}
