// Change the demographic Info
function demographicInfo(sample){
  var metadataInfo = d3.select("#sample-metadata");
  d3.json("data/samples.json").then((incomingData) => {
    // Clear the node if data is present
    metadataInfo.html("");
    var metadataVar = incomingData.metadata;
    var resultList = metadataVar.filter(sampleObject => sampleObject.id == sample);
    var result = resultList[0];
    Object.entries(result).forEach(([key, value]) => {
      metadataInfo.append("h6").text(`${key} : ${value}`);
  });
});
};

// Build the bar chart
function barChart(barId){
  d3.json("data/samples.json").then(incomingData => {
    
    var sampleData = incomingData.samples;
    var sampleList = sampleData.filter(sampleObject => sampleObject.id == barId);    
    var finalList = sampleList[0];

    // var otu_id = sampleData.id;

    // console.log(sampleList);

    var otuIds = finalList.otu_ids.slice(0, 10).reverse();
    var sampleValues = finalList.sample_values.slice(0, 10).reverse();
    var otuLables = finalList.otu_labels.slice(0, 10).reverse();

    var finalOtuIds = otuIds.map(d => 'OTU' + ' ' + d);
    
    trace = {
      type: "bar",
      x: sampleValues,
      y: finalOtuIds,
      // value: sampleValues,
      // label: otuIds,
      text: otuLables,
      orientation: "h"
    }

     var layout = {
      title: "Top 10 OTUs in Subject ID No.- " + barId,
       xaxis: {
         title: "Sample Values"
       } 
     }

    Plotly.newPlot("bar", [trace], layout);
  });
}

// Build bubble chart
function bubbleChart(bubbleId){
  d3.json("data/samples.json").then(incomingData => {
    
    var sampleData = incomingData.samples;
    var sampleList = sampleData.filter(sampleObject => sampleObject.id == bubbleId);    
    var finalList = sampleList[0];

    var otuIds = finalList.otu_ids;
    var sampleValues = finalList.sample_values;
    var otuLables = finalList.otu_labels;
  
    trace = {
      mode: "markers",
      marker: {
        color: otuIds,
        size: sampleValues
        },
      x: otuIds,
      y: sampleValues,
      size: sampleValues,
      sizeref: 2,
      sizemode: 'area'
    };

    var layout = {
      title: "Bubble Chart for Subject ID No.- " + bubbleId,
      xaxis : {
        title: "OTU ID"
      },
      yaxis : {
        title: "Sample Values"
      }
    };

    Plotly.newPlot("bubble", [trace], layout);
  });
};

// Initiate the dashboard
function init(){
  var selector = d3.select("#selDataset");
  d3.json("data/samples.json").then(incomingData => {
    var sampleNames = incomingData.names;
    sampleNames.forEach(sample => {
      selector.append("option").text(sample).property("value", sample);
    });
    var firstSample = sampleNames[0];
   
    demographicInfo(firstSample);
    barChart(firstSample);
    // gaugeChart(firstSample);
    bubbleChart(firstSample);
   
  });
};

// This function change on change of OTU ID
function optionChanged(changedSample){
  demographicInfo(changedSample);
  barChart(changedSample);
  // gaugeChart(changedSample);
  bubbleChart(changedSample);
};

init()



// function gaugeChart(gaugeID){
//   d3.json("data/samples.json").then(incomingData => {
    
//     var sampleData = incomingData.samples;
//     var sampleList = sampleData.filter(sampleObject => sampleObject.id == gaugeId);    
//     var finalList = sampleList[0];

//     var otuIds = finalList.otu_ids;
//     var sampleValues = finalList.sample_values;
//     var otuLables = finalList.otu_labels;


//   var data = [
//   {
//     type: "indicator",
//     mode: "gauge+number+delta",
//     // value: 420,
//     title: { text: "Gauge meter", font: { size: 24 } },
//     delta: { reference: 9, increasing: { color: "RebeccaPurple" } },
//      gauge: {
//       axis: { range: [0, 9], tickwidth: 1, tickcolor: "darkblue" },
//       bar: { color: "darkblue" },
//       bgcolor: "white",
//       borderwidth: 2,
//       bordercolor: "gray",
//       steps: [
//         { range: [0, 250], color: "cyan" },
//         { range: [250, 400], color: "royalblue" }
//       ],
//       threshold: {
//         line: { color: "red", width: 4 },
//         thickness: 0.75,
//         value: 490
//       }
//     }
//   }
// ];

// var layout = {
//   width: 500,
//   height: 400,
//   margin: { t: 25, r: 25, l: 25, b: 25 },
//   paper_bgcolor: "lavender",
//   font: { color: "darkblue", family: "Arial" }
// };

// Plotly.newPlot('gauge', data, layout);


//   });
// }
