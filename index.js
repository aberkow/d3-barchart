const d3 = require('d3');

//tutorial 1
//const data = [4, 8, 15, 16, 23, 42];

//d3v4 uses .scaleLinear instead of .scale.linear
// const x = d3.scaleLinear()
//             .domain( [0, d3.max(data)] )
//             .range( [0, 420] );
//
// d3.select('.chart')
//   .selectAll('div')
//     .data(data)
//   .enter().append('div')
//     .style('width', function(d) {
//       return d * 10 + 'px';
//     })
//     .text(function(d) {
//       return d;
//     });


// ---------------------------
//tutorial 2
const data = require('./data.tsv');

const width = 420,
      barHeight = 20;

let x = d3.scaleLinear()
            .range( [0, width] );

const chart = d3.select('.chart')
                .attr('width', width);

d3.tsv('data.tsv', type, function(error, data){

  x.domain(
    [0, d3.max(data, function(d){
      return d.value;
    })]
  );
  chart.attr('height', barHeight * data.length);
    console.log(data.length, 'from chart');
    var bar = chart.selectAll('g')
                .data(data)
              .enter().append('g')
                .attr('transform', function(d, i){
                  return 'translate(0,' + i * barHeight + ')';
                });
    bar.append('rect')
      .attr('width', function(d){
        return x(d.value);
      })
      .attr('height', barHeight - 1);
    bar.append('text')
      .attr('x', function(d){
        return x(d.value) - 3;
      })
      .attr('y', barHeight / 2)
      .attr('dy', '.35em')
      .text(function(d) {
        return d.value;
      });
});

function type(d){
  d.value = Number(d.value);
  return d;
};
