'use strict';
import d3 from 'd3';
import isFinite from 'lodash/isFinite';


export default class ecgComponent {
  /*@ngInject*/
  constructor($element) {
    this.audio = new Audio('/assets/audio/beep.ogg');

    this.options = {
      margin: {
        top: 0,
        right: 1,
        bottom: 10,
        left: 10
      },
      height: 450,
      width: 750,

      xMin: 0,
      xMax: 7000,
      xMajorTicks: 1000,

      yMin: -1024,
      yMax: 1512
    };
    this.$element = $element;
    this.initSvg();
  }

  initSvg() {
    // Create the SVG element to render the chart into.
    this.svg = d3.select(this.$element[0]).append('svg')
      .attr('height', this.options.height)
      .attr('width', this.options.width);

    // Adjust the dimensions to compensate for the margins.
    this.options.height = this.options.height - this.options.margin.top - this.options.margin.bottom;
    this.options.width = this.options.width - this.options.margin.left - this.options.margin.right;


    // Create a root canvas to put all elements into and move it according to the margins.
    // The extra 0.5 pixels is to avoid blur on retina screens.
    this.canvas = this.svg
      .append('g')
      .attr('transform',
        `translate(${(this.options.margin.left + 0.5)}, ${this.options.margin.top + 0.5} )`
      );

    // Create a background for the chart area.
    this.canvas.call(selection => {
      this.background = selection.append('rect')
        .classed('jke-ecgChart-background', true)
        .attr('height', this.options.height)
        .attr('width', this.options.width)
        .attr('x', 0)
        .attr('y', 0);
    });


    // Create a scale for the y-coordinates.
    this.yScale = d3.scale.linear()
      .domain([this.options.yMax, this.options.yMin])
      .range([0, this.options.height]);

    // Create a scale for x-coordinates.
    this.xScale = d3.scale.linear()
      .domain([this.options.xMin, this.options.xMax])
      .range([0, this.options.width]);


    // Create the y-axis.
    this.yAxisGenerator = d3.svg.axis()
      .scale(this.yScale)
      .orient('left')
      .ticks(0)
      .tickFormat('');
    this.yAxis = this.canvas
      .append('g')
      .classed('jke-ecgChart-axis-y', true)
      .call(this.yAxisGenerator);

    // Create a horizontal grid.
    this.yGridGenerator = d3.svg.axis()
      .scale(this.yScale)
      .orient('left')
      .ticks(5)
      .tickSize(-this.options.width)
      .tickFormat('');
    // this.yGrid = this.canvas
    //   .append('g')
    //   .classed('jke-ecgChart-grid-y', true)
    //   .call(this.yGridGenerator);


    // Create the x-axis.
    this.xAxisGenerator = d3.svg.axis()
      .scale(this.xScale)
      .orient('bottom')
      .ticks(0)
      .tickFormat('');
    this.xAxis = this.canvas
      .append('g')
      .classed('jke-ecgChart-axis-x', true)
      .attr('transform', `translate(0, ${this.options.height})`)
      .call(this.xAxisGenerator);

    // Create a vertical grid.
    this.xGridGenerator = d3.svg.axis()
      .scale(this.xScale)
      .orient('top')
      .ticks(1)
      .tickSize(-this.options.height)
      .tickFormat('');
    this.xGrid = this.canvas
      .append('g')
      .classed('jke-ecgChart-grid-x', true)
      .call(this.xGridGenerator);


    // Create a clipping mask to make sure that the chart don't escape.
    this.svg.call(selection => {
      this.clipMask = selection
        .append('defs')
        .append('svg:clipPath')
        .attr('id', 'ecgChartClip')
        .append('svt:rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('height', this.options.height)
        .attr('width', this.options.width);
    });

    // Create the line.
    this.data = [];
    this.lineGenerator = d3.svg.line()
      .interpolate('cardinal')
      .x(d => this.xScale(d.x))
      .y(d => this.yScale(d.y));
    this.line = this.canvas
      .append('g')
      .attr('clip-path', 'url(#ecgChartClip)')
      .append('path')
      .datum(this.data)
      .classed('jke-ecgChart-line', true)
      .attr('d', this.lineGenerator);

    this.initialized = true;

    // const heartRate = 60; // bpm
    // const interval = 60 * 1000 / (data.length * heartRate);

    // this.interval = this.$interval(() => {
    //   this.addDataPoint(getDataPoint());
    // }, interval);
  }

  $onDestroy() {
    this.$element.remove('svg');
    // this.$interval.cancel(this.interval);
  }

  $onChanges(changedObject) {
    if (!this.initialized) return;
    if (!changedObject.valor || !changedObject.x) return;
    if (!isFinite(changedObject.valor.currentValue)) return;
    let y = changedObject.valor.currentValue;
    y = y > -40 && y < 40 ? 0 : y
    if (changedObject.beep && changedObject.beep.currentValue && y) {
      this.audio.play();
    }
    const object = {
      x: changedObject.x.currentValue,
      y
    };
    this.addDataPoint(object);
  }

  redraw() {
    this.line.attr('d', this.lineGenerator);
  }

  addDataPoint(dataPoint) {
    // Create a point within range.
    // if (!this.data || !this.data.length) {
    //   this.data = [];
    // }

    const point = {
      x: dataPoint.x % this.options.xMax,
      y: dataPoint.y
    };

    // Check if we need to clear the line before starting.
    if (this.lastX && this.lastX > point.x) {
      this.data.length = 0;
    }
    this.lastX = point.x;

    this.data.push(point);
    this.redraw();
  }

}

