import React from 'react';
import {initializeChart, handleNewData, setWidth} from './d3chart';
import d3Config from './d3Config'

export default class LineChart extends React.Component {
    constructor(props) {
      super(props);
  
      this.callSetWidth = this.callSetWidth.bind(this);
    }
  
    componentDidMount() {
			const { timeSeriesData } = this.props;
			console.log(timeSeriesData)
      initializeChart(timeSeriesData);
      window.addEventListener('resize', this.callSetWidth);
    }
  
    componentDidUpdate(prevProps) {
			console.log('updating')
      const { timeSeriesData } = this.props;
      if (prevProps.timeSeriesData !== timeSeriesData) 
        handleNewData(timeSeriesData);
    }
  
    componentWillUnmount() {
      window.removeEventListener('resize', this.callSetWidth);
    }
    
    callSetWidth() {
      const { timeSeriesData } = this.props;
      setWidth(timeSeriesData);
    }
  
    render() {
      return (
        <div id='line-chart-container'>
          <svg className="line-chart" width="100%" height={d3Config.svgDefaultHeight} />
        </div>
      );
    }
  }