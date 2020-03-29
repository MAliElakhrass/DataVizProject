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
    dataset: Array<BarChartData>;
  }
  
/**
 * Data read from the dataset
 */
export interface BarChartData {
    id: number;
    name: string;
    label: string;
    value: number;
}