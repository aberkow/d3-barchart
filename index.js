const d3 = require('d3');

const data = [4, 8, 15, 16, 23, 42];

//d3v4 uses .scaleLinear instead of .scale.linear
const x = d3.scaleLinear()
            .domain( [0, d3.max(data)] )
            .range( [0, 420] );

d3.select('.chart')
  .selectAll('div')
    .data(data)
  .enter().append('div')
    .style('width', function(d) {
      return d * 10 + 'px';
    })
    .text(function(d) {
      return d;
    });
