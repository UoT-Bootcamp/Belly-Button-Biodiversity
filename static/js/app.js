
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

function pieChart(barId){
  d3.json("data/samples.json").then(incomingData => {
    
    var sampleData = incomingData.samples;
    var sampleList = sampleData.filter(sampleObject => sampleObject.id == barId);    
    // console.log(sampleList);
    var finalList = sampleList[0];

    // console.log(finalList);
    // var finalSlice = sampleList.slice(0, 10).reverse();
    // console.log(finalSlice)
    var otuIds = finalList.otu_ids.slice(0, 10).reverse();
    var sampleValues = finalList.sample_values.slice(0, 10).reverse();
    var otuLables = finalList.otu_labels.slice(0, 10).reverse();

    // console.log(otuIds)
    // console.log(sampleValues)
    // console.log(otuLables)
    trace = {
      type: "bar",
      x: sampleValues,
      y: `OTU ${otuIds}`,
      // value: sampleValues,
      // label: otuIds,
      text: otuLables
    }

    //  var layout = {
    //    yaxis: {
    //      title: `OTU ${otuIds}`
    //    } 
    //  }
    Plotly.newPlot("bar", [trace]);
  });
}

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

    Plotly.newPlot("bubble", [trace]);
  });
};

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


function init(){
  var selector = d3.select("#selDataset");
  d3.json("data/samples.json").then(incomingData => {
    var sampleNames = incomingData.names;
    sampleNames.forEach(sample => {
      selector.append("option").text(sample).property("value", sample);
      
    });
    var firstSample = sampleNames[0];
    // console.log(firstSample);
    demographicInfo(firstSample);
    pieChart(firstSample);
    gaugeChart(firstSample);
    bubbleChart(firstSample);
    gaugeChart(firstSample);

    

    
  });
}

function optionChanged(changedSample){
  demographicInfo(changedSample);
  pieChart(changedSample);
  gaugeChart(changedSample);
  bubbleChart(changedSample);
  gaugeChart(changedSample);

}

init()