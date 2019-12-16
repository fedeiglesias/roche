import React from 'react';
import { IPatientItem, IGlucoseMeasure } from '../../../models';
import styled from 'styled-components';
import GlucemyMeasuresTooltip from './GlucemyMeasuresTooltip';

const color = '#0065c8';
const size = 40;


const Graph = styled.div`
  
  svg {
    border: 0px;
  }

  .chart {
    overflow: visible;
  }

  .axis-x g .label {
    text-anchor: middle;
    font-size: 10px;
    fill: #2c2c2c;
  }

  .axis-x g .guide {
    stroke: #E2E2E2;
    stroke-dasharray: 3;
  }

  .axis-x g:last-child .guide,
  .axis-x g:first-child .guide {
    stroke-dasharray: 0;
  }

  .axis-x g .tick {
    stroke: #E2E2E2;
    stroke-dasharray: 0;
  }

  /*
    AXIS Y
  */
  .axis-y line {
    stroke: #E2E2E2;
    stroke-dasharray: 3;
  }

  .axis-y line:first-child,
  .axis-y line:last-child {
    stroke: #E2E2E2;
    stroke-dasharray: 3;
  }

  .axis-y text {
    font-size: 14px;
    fill: #2c2c2c;
  }

  /*
    RANGES LOW
  */

  .ranges .low line {
    stroke: rgba(255,74,104,0.8);
  }

  .ranges .low text {
    text-anchor: end;
    font-size: 12px;
    fill: rgba(216,17,52,1);
  }



  /*
    RANGES IDEAL
  */
  .ranges .ideal .tick-from {
    stroke: rgba(72,172,94,1);
  }

  .ranges .ideal .tick-to {
    stroke: rgba(72,172,94,1);
  }

  .ranges .ideal rect {
    fill: rgba(177,239,178,0.45);
  }

  .ranges .ideal .text-from {
    text-anchor: end;
    font-size: 12px;
    fill: rgba(72,172,94,1);
  }

  .ranges .ideal .text-to {
    text-anchor: end;
    font-size: 12px;
    fill: rgba(72,172,94,1);
  }


  /*
    RANGES HIGH
  */
  .ranges .high text {
    text-anchor: end;
    font-size: 12px;
    fill: rgba(0,0,0,0.8);
  }

  /*
    RANGES ZERO
  */
  .ranges .zero text {
    text-anchor: end;
    font-size: 12px;
    fill: rgba(0,0,0,0.8);
  }


  .glucose-measures polyline {
    stroke: rgba(0,0,0,0.8);
  }

  .glucose-measures .measure {
    cursor: pointer;
  }

  .glucose-measures .measure .red {
    fill: #d81134;
  }

  .glucose-measures .measure .blue {
    fill: #5cb7e2;
  }




  /*
    TIME BLOCKS
  */

  .time-blocks .block:nth-child(odd) rect {
    fill: rgba(0, 0, 0, 0.05);
  }

  .time-blocks .block:nth-child(even) rect {
    fill: rgba(0, 0, 0, 0.0);
  }

  .time-blocks .block .tick-from,
  .time-blocks .block .tick-to {
    stroke: #E2E2E2;
  }

  .time-blocks .block .label {
    text-anchor: middle;
    text-transform: capitalize;
    font-size: 10px;
    fill: #2c2c2c;
  }
`;


export interface GlucemyMeasuresChartProps {
  patient: IPatientItem | null;
}

interface GlucemyMeasuresChartState {
  height: number,
  width: number,
  tooltip: {
    show: boolean;
    top: number;
    left: number;
    gm: IGlucoseMeasure;
  }
}

export default class GlucemyMeasuresChart extends React.Component<GlucemyMeasuresChartProps, GlucemyMeasuresChartState> {
  constructor(props: GlucemyMeasuresChartProps) {
      super(props);
  
      this.state = {
        height: 216,
        width: 974,
        tooltip: {
          show: false,
          top: 0,
          left: 0,
          gm: {
            date: '',
            glucose: 0
          }
        }
      };
  }

  hourToCoordenate(time: string) {
    // parse str to Time
    let t = new Date(time);
    // convert Day Time in seconds
    let totalSeconds = t.getUTCHours() * 3600 + t.getUTCMinutes() * 60 + t.getUTCSeconds()
    // get percent based on seconds in a day
    let percentualXPosition = totalSeconds * 100 / 86400
    // return absolute position base on char width
    return this.state.width * percentualXPosition / 100
  }

  measureToCoordenate(glucose: number) {
    // get percent based on highest measure
    let percentualYPosition = glucose * 100 / this.props.patient.ranges.high
    // invert Y axis 
    percentualYPosition = Math.abs(percentualYPosition - 100)
    // return absolute position based on char height
    return this.state.height * percentualYPosition / 100
  }
  
  /** 
   * renderAxisX: Print X axis basic data with respective guidelines, ticks and labels
   * renderAxisY: Print Y axis with respective guidelines and ticks
   * renderTimeBlocks: Print Time Blocks from state
   * renderGlucoseMeasures: Draw Glucose measures in chart
   * renderRanges: Render low, high and ideal measures
  */
  
  renderAxisY() {
    return (
      <g className="axis-y">
        /* Label with inverted axis */
        <text 
          x={this.state.height / 2 * -1} y="-25%" 
          textAnchor="middle" 
          dominantBaseline="central" 
          transform="rotate(-90, 0, 0)">
          Glucemia (mg/dL)
        </text>
        <line x1="-7" y1="0%" x2="100%" y2="0%"/>
        <line x1="0%" y1="33%" x2="100%" y2="33%"/>
        <line x1="0%" y1="66%" x2="100%" y2="66%"/>
        <line x1="-7" y1="100%" x2="100%" y2="100%"/>
      </g>
    )
  }

  renderAxisX(){
    const ticks = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '00:00']
    const separation = 100 / (ticks.length - 1);
    return (
      <g className="axis-x">
        { 
          ticks.map( (tick, i) => (
            <g key={i}>
              <line className="guide" x1={(i) * separation + '%'} y1="0%" x2={(i) * separation + '%'} y2="100%"/>
              <line className="tick" x1={(i) * separation + '%'} y1="100%" x2={(i) * separation + '%'} y2="105%"/>
              <text className="label" x={(i) * separation + '%'} y="110%">{tick}</text>
            </g>
          ))
        }
      </g>
    )
  }

  renderGlucoseMeasures() {
    let measuresCoordenates = this.props.patient.glucoseMesures.map( m => [
      this.hourToCoordenate(m.date),
      this.measureToCoordenate(m.glucose)
    ])

    return (
      <g className="glucose-measures">
        <polyline 
          points={
            this.props.patient.glucoseMesures.map( m => [
              this.hourToCoordenate(m.date),
              this.measureToCoordenate(m.glucose)
            ]).join(' ')} 
          stroke="black" 
          fill="none"/>
        {
          this.props.patient.glucoseMesures.map( (m,i) => {
            return (
              <svg
                key={i}
                viewBox="0 0 35 35"
                x={this.hourToCoordenate(m.date) - 7.5} 
                y={this.measureToCoordenate(m.glucose) - 7.5} 
                width="15" height="15"
                className="measure"
                onMouseEnter={ this.showGlucoseDetails(m) }
                onMouseLeave={ this.hideGlucoseDetails() }>
                <rect width="100%" height="100%" fill="rgba(0, 0, 0, 0)"/>
                <path
                  transform="translate(5, 5)"
                  className={`${ this.props.patient.ranges.low > m.glucose ? 'red' : ''} ${ this.props.patient.ranges.ideal.to < m.glucose ? 'blue' : ''}`}
                  d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
              </svg>
            )
          })
        }
      </g>
    )
  }

  renderTimeBlocks() {
    const shadowWidth = '';
    return (
      <g className="time-blocks">
      {
        Object.entries(this.props.patient.timeBlocks).map( (tb, i) => {
          //fix 00:00 to 23:59
          if(tb[1].to == '00:00') tb[1].to = '23:59'
          let fromTimeCoord = this.hourToCoordenate(`1970-01-01T${tb[1].from}:00+00:00`)
          let toTimeCoord = this.hourToCoordenate(`1970-01-01T${tb[1].to}:00+00:00`)
          let blockWidth = toTimeCoord - fromTimeCoord
          let textPosition = fromTimeCoord + blockWidth * 0.5

          return (
            <g className="block" key={i}>
              <text className="label" x={textPosition} y="-10%">{tb[0]}</text>
              <line className="tick-from" x1={fromTimeCoord} y1="0%" x2={fromTimeCoord} y2="-10%" stroke="black"/>
              <line className="tick-to" x1={toTimeCoord} y1="0%" x2={toTimeCoord} y2="-10%" stroke="black"/>
              <rect x={fromTimeCoord} y="0" height="100%" width={blockWidth}/>
            </g>
          )
        })
      }
      </g>
    )
  }

  renderRanges() {
    const ideal_to = Math.abs(this.props.patient.ranges.ideal.to * 100 / this.props.patient.ranges.high - 100);
    const ideal_from = Math.abs(this.props.patient.ranges.ideal.from * 100 / this.props.patient.ranges.high - 100);
    const low = Math.abs(this.props.patient.ranges.low * 100 / this.props.patient.ranges.high - 100);
    const ideal_range_height = (this.props.patient.ranges.ideal.to - this.props.patient.ranges.ideal.from) * this.state.height / this.props.patient.ranges.high;
    
    return (
      <g className="ranges">
        <g className="ideal">
          <rect x="0" y={ideal_to + '%'} width="100%" height={ideal_range_height + 'px'}/>
          <line className="tick-from" x1="-7" y1={ideal_from + '%'} x2="0" y2={ideal_from + '%'}/>
          <line className="tick-to" x1="-7" y1={ideal_to + '%'} x2="0" y2={ideal_to + '%'}/>
          <text className="text-from" x="-10px" y={ideal_from + '%'} dy="0.5ex">{this.props.patient.ranges.ideal.from}</text>
          <text className="text-to" x="-10px" y={ideal_to + '%'} dy="0.5ex">{this.props.patient.ranges.ideal.to}</text>
        </g>
        <g className="low">
          <line x1="-7px" y1={low + '%'} x2="100%" y2={low + '%'}/>
          <text x="-10px" y={low + '%'} dy="0.5ex">{this.props.patient.ranges.low}</text>
        </g>
        <g className="high">
          <text x="-10px" y="0%" dy="0.5ex">{this.props.patient.ranges.high}</text>
        </g>
        <g className="zero">
          <text x="-10px" y="100%" dy="0.5ex">0</text>
        </g>
      </g>
    )
  }

  //Closure: Handler Tooltip
  showGlucoseDetails(gm: IGlucoseMeasure){
    return async (e:React.FormEvent<SVGSVGElement>)  => {
      const {top, left, width, height} = (e.target as HTMLTextAreaElement).getBoundingClientRect()
      await this.setState({
        tooltip: {
          show: true,
          top: top + window.scrollY + height, 
          left: left + window.scrollX + width,
          gm: gm
        }
      })
    }
  }

  hideGlucoseDetails() {
    return (e:React.FormEvent<SVGSVGElement>) => {
      this.setState( Object.assign({}, this.state, {
        tooltip: {
          show: false
        }
      }));
    }
  }

  render() {
    return (
      <Graph>
        { 
          (this.state.tooltip.show) && 
          <GlucemyMeasuresTooltip 
            data={this.state.tooltip} 
            ranges={this.props.patient.ranges}>
          </GlucemyMeasuresTooltip>
        }

        <svg viewBox="0 0 1080 290" height="290" width="900"
          xmlns="http://www.w3.org/2000/svg">
            
            <svg x="80" y="40" height={this.state.height} width={this.state.width} className="chart">
              { this.renderAxisX() }
              { this.renderAxisY() }
              { this.renderRanges() }
              { this.renderTimeBlocks() }
              { this.renderGlucoseMeasures() }
            </svg>
        </svg>
      </Graph>
    );
  }
}