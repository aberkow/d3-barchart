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
// const data = require('./data.tsv');
//
// const width = 420,
//       barHeight = 20;
//
// let x = d3.scaleLinear()
//             .range( [0, width] );
//
// const chart = d3.select('.chart')
//                 .attr('width', width);
//
// d3.tsv('data.tsv', type, function(error, data){
//
//   x.domain(
//     [0, d3.max(data, function(d){
//       return d.value;
//     })]
//   );
//   chart.attr('height', barHeight * data.length);
//     console.log(data.length, 'from chart');
//     var bar = chart.selectAll('g')
//                 .data(data)
//               .enter().append('g')
//                 .attr('transform', function(d, i){
//                   return 'translate(0,' + i * barHeight + ')';
//                 });
//     bar.append('rect')
//       .attr('width', function(d){
//         return x(d.value);
//       })
//       .attr('height', barHeight - 1);
//     bar.append('text')
//       .attr('x', function(d){
//         return x(d.value) - 3;
//       })
//       .attr('y', barHeight / 2)
//       .attr('dy', '.35em')
//       .text(function(d) {
//         return d.value;
//       });
// });
//
// function type(d){
//   d.value = Number(d.value);
//   return d;
// };

// tutorial 3
//______________________

const alphabet = require('./alphabet.tsv');

const margin = {
  top: 20,
  right: 30,
  bottom: 30,
  left: 40
};
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const x = d3.scaleBand()
            .range( [0, width])
            .round(.1);

const y = d3.scaleLinear()
            .range( [height, 0] );

const xAxis = d3.axisBottom(x);

// d3.svg.axis()
//                 .scale(x)
//                 .orient('bottom');

const yAxis = d3.axisLeft(x)
                .ticks(10, '%');

// d3.svg.axis()
//                 .scale(y)
//                 .orient('left')
//                 .ticks(10, '%');

const chart = d3.select('.chart')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')' );

d3.tsv('alphabet.tsv', type, function(error, data){
  x.domain(data.map(function(d){
    return d.name;
  }));
  y.domain( [0, d3.max(data, function(d){
    return d.value;
  })]);

  chart.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0' + height + ')')
      .call(xAxis);

  chart.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Frequency');

  // var barWidth = width / data.length;

  chart.selectAll('g')
        .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', function(d){
          return x(d.name);
        })
        .attr('y', function(d){
          return y(d.value);
        })
        .attr('height', function(d){
          return height - y(d.value);
        })
        .attr('width', x.band());
    //     .attr('transform', function(d, i){
    //       return 'translate(' + i * barWidth + ',0)';
    //     });
    // bar.append('rect')
    //   .attr('y', function(d){
    //     return y(d.value);
    //   })
    //   .attr('height', function(d){
    //     return height - y(d.value);
    //   })
    //   .attr('width', barWidth - 1);
    // bar.append('text')
    //   .attr('x', barWidth / 2)
    //   .attr('y', function(d){
    //     return y(d.value) + 3;
    //   });
    //   .attr('dy', '.75em')
    //   .text(function(d){
    //     return d.value;
    //   });
});

const type = function(d){
  d.value = +d.value;
  return d;
}
