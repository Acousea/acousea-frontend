import {Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit, OnChanges} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-histogram',
  standalone: true,
  imports: [],
  templateUrl: './histogram.component.html',
  styleUrl: './histogram.component.css'
})
export class HistogramComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('chart') private chartContainer!: ElementRef;
  @Input() data!: { timestamp: Date, clicks: number }[];
  @Input() timeMode: 'minutes' | 'hours' | 'daily' = 'hours';
  @Input() scaleMode: 'linear' | 'log' = 'linear';

  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width!: number;
  private height!: number;
  private svg: any;
  private x: any;
  private y: any;
  private line: any;

  constructor() { }

  ngOnInit(): void {
    // Inicialización general si es necesario
  }

  ngAfterViewInit(): void {
    if (this.chartContainer) {
      this.createChart();
      if (this.data) {
        this.updateChart();
      }
    } else {
      console.error("No chart container found");
    }
  }

  ngOnChanges(): void {
    if (this.svg) {
      this.updateChart();
    }
  }

  private createChart(): void {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    console.log("Width: ", this.width);
    console.log("Height: ", this.height);

    this.svg = d3.select(element)
      .append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    this.x = d3.scaleTime().range([0, this.width]);
    this.y = this.scaleMode === 'log' ? d3.scaleLog().range([this.height, 0]) : d3.scaleLinear().range([this.height, 0]);

    this.line = d3.line()
      .x((d: any) => this.x(d.timestamp))
      .y((d: any) => this.y(d.clicks));

    this.svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${this.height})`);

    this.svg.append('g')
      .attr('class', 'y axis');
  }

  private updateChart(): void {
    this.x.domain(d3.extent(this.data, d => d.timestamp));
    this.y.domain([1, d3.max(this.data, d => d.clicks)]);

    this.svg.select('.x.axis')
      .call(d3.axisBottom(this.x));

    this.svg.select('.y.axis')
      .call(d3.axisLeft(this.y).ticks(10, this.scaleMode === 'log' ? ',.1s' : undefined));

    this.svg.selectAll('.dot')
      .data(this.data)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', (d: any) => this.x(d.timestamp))
      .attr('cy', (d: any) => this.y(d.clicks))
      .attr('r', 3);

    this.svg.selectAll('.line')
      .data([this.data])
      .enter().append('path')
      .attr('class', 'line')
      .attr('d', this.line);
  }
}
