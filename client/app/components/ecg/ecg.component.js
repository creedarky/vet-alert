'use strict';
const angular = require('angular');
const d3 = require('d3');
/* eslint-disable */
const data = [
  0, 0, 0, 0, 0.0000050048828125, 0.0000137939453125, 0.000049560546875,
  0.00008740234375, 0.00015966796875, 0.000262451171875, 0.0003975830078125, 0.0005687255859375,
  0.0007802734375, 0.001037353515625, 0.0013468017578125, 0.00172119140625, 0.0021756591796875,
  0.0027232666015625, 0.0033880615234375, 0.004206787109375, 0.0052380371093750005,
  0.006586181640625, 0.008400146484375001, 0.010904296875, 0.0144892578125, 0.0196798095703125,
  0.049684204101562504, 0.0886883544921875, 0.11185363769531251, 0.134164306640625,
  0.137352294921875, 0.1160369873046875, 0.08516308593750001, 0.0539765625,
  0.014997436523437501, -0.015882568359375, -0.0387554931640625, -0.06125732421875,
  -0.0745780029296875, -0.07479357910156251, -0.0725338134765625, -0.0418538818359375,
  0.08582861328125001, 0.397717529296875, 0.8136408691406251, 1.2295617980957032,
  0.9944150390625001, 0.2824605712890625, -0.38949267578125, -0.597251220703125,
  -0.425675537109375, -0.1537947998046875, -0.0500914306640625, -0.0111041259765625,
  0.0027451171875, 0.0071739501953125, 0.008443359375, 0.0094327392578125, 0.012530517578125,
  0.0176046142578125, 0.0300162353515625, 0.0433489990234375, 0.056962646484375004,
  0.0704832763671875, 0.0770511474609375, 0.0898175048828125, 0.10311853027343751,
  0.117046142578125, 0.1312630615234375, 0.1529300537109375, 0.167607177734375,
  0.1899068603515625, 0.2124422607421875, 0.235044677734375, 0.2575535888671875,
  0.2724073486328125, 0.286978271484375, 0.3007579345703125, 0.3067425537109375,
  0.3106370849609375, 0.303756103515625, 0.2897236328125,0.25916931152343753,
  0.2200599365234375, 0.1728209228515625, 0.133416259765625, 0.086224853515625,
  0.05493408203125, 0.02409423828125, 0.00922607421875, -0.0043409423828125,
  -0.0097349853515625, -0.013127685546875, -0.01423095703125, -0.013834716796875,
  -0.012556030273437501, -0.010675048828125, -0.00835888671875,
  -0.0057305908203125, -0.0000562744140625
];


const getDataPoint = (function() {
  let _x = -1;
  const _max = data.length;

  return function() {
    _x = (_x + 1) % _max;
    return { x: Date.now(), y: data[_x] };
  };
})();
/* eslint-enable */

export default class ecgComponent {
  /*@ngInject*/
  constructor($element, $interval) {
    this.message = 'World';
    this.options = {
      margin: {
        top: 0,
        right: 1,
        bottom: 10,
        left: 10
      },
      height: 450,
      width: 600,

      xMin: 0,
      xMax: 3000,
      xMajorTicks: 1000,

      yMin: -1,
      yMax: 1.5
    };
    this.$element = $element;
    this.$interval = $interval;
    console.log($element, d3);
  }

  $onInit() {
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
      .ticks(4)
      .tickFormat('');
    this.yAxis = this.canvas
      .append('g')
      .classed('jke-ecgChart-axis-y', true)
      .call(this.yAxisGenerator);

    // Create a horizontal grid.
    this.yGridGenerator = d3.svg.axis()
      .scale(this.yScale)
      .orient('left')
      .ticks(4)
      .tickSize(-this.options.width)
      .tickFormat('');
    this.yGrid = this.canvas
      .append('g')
      .classed('jke-ecgChart-grid-y', true)
      .call(this.yGridGenerator);


    // Create the x-axis.
    this.xAxisGenerator = d3.svg.axis()
      .scale(this.xScale)
      .orient('bottom')
      .ticks(this.options.xMax / this.options.xMajorTicks)
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
      .ticks(this.options.xMax / this.options.xMajorTicks)
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

    const heartRate = 60; // bpm
    const interval = 60 * 1000 / (data.length * heartRate);

    this.interval = this.$interval(() => {
      this.addDataPoint(getDataPoint());
    }, interval);
  }

  $onDestroy() {
    this.$element.remove('svg');
    this.$interval.cancel(this.interval);
  }

  redraw() {
    this.line.attr('d', this.lineGenerator);
  }

  addDataPoint(dataPoint) {
    // Create a point within range.
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

