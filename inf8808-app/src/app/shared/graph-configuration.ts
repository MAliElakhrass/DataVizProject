import { ParamWeight } from './../services/param-weight-data.service';
import { CorrMatrix } from '../services/correlation-data.service';
/**
 * All configuration parameters
 */
export interface BarChartConfig {
  width: number;
  height: number;
  marginTop: number;
  marginBottom: number;
  marginRight: number;
  marginLeft: number;
  title: string;
  dataset: Array<ParamWeight>;
}

export interface HeatMapConfig {
  width: number;
  height: number;
  marginTop: number;
  marginBottom: number;
  marginRight: number;
  marginLeft: number;
  dataset: Array<CorrMatrix>;
}
