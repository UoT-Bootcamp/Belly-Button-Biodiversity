
// function demographicInfo(){
//   var metadataInfo = d3.select("#sample-metadata");
//   d3.json("data/samples.json").then((incomingData) => {
//     // Clear the node if data is present
//     metadataInfo.html("");
//     Object.entries(incomingData.metadata[0]).forEach(([key, value]) => {
//       metadataInfo.append("h6").text(`${key} : ${value}`);
//   });
// });
// };


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





// function dropdownData(){
//   var dropdown = d3.select("#selDataset");
//   d3.json("data/samples.json").then(incomingData => {
//     dropdown.html("");
//     Object.entries(incomingData.names).forEach(([key, value]) => {
//       dropdown.append("p").text(`${value}`).append("hr")
//   });
//   })
// }
// dropdownData()

function init(){
  var selector = d3.select("#selDataset");
  d3.json("data/samples.json").then(incomingData => {
    var sampleNames = incomingData.names;
    sampleNames.forEach(sample => {
      selector.append("option").text(sample).property("value", sample);
      
    });
    var firstSample = sampleNames[0];
    console.log(firstSample);
    demographicInfo(firstSample);

    
  });
}

function optionChanged(changedSample){
  demographicInfo(changedSample);


}

init()
// d3.json("data/samples.json").then((incomingData) => console.log(incomingData));


// function bubbleChart(){
//     d3.json("data/samples.json").then(function(data) {

//         var sampleArray = data.samples;

//         var otuId = [];
//         var sampleValue = [];
//         var otuLabel = [];
//         for (i = 0; i < sampleArray.length; i++) {
            
//             otuId.push(sampleArray[i].otu_ids);
//             sampleValue.push(sampleArray[i].sample_values);
//             otuLabel.push(sampleArray[i].otu_labels);   
//           }
        
//           var otuIds = [].concat.apply([], otuId);
//           var sampleValues = [].concat.apply([], sampleValue);
//           var otuLabels = [].concat.apply([], otuLabel);

//           // console.log(otuIds);
//           // console.log(sampleValues);
//           // console.log(otuLabels);
//           var trace = {
//             x: otuIds,
//             y: sampleValues,
//             mode: "markers",
//             marker: {
//                 color: otuIds,
   
//                 size: sampleValues,
//                 sizeref: 2,
//                 sizemode: 'area'
//               },
//             text: otuLabels
            

//          };
//         Plotly.newPlot("bubble", [trace]);



//         // for (i = 0; i< otuIds.length; i++) {
//         //  var trace = {
//         //     mode: "markers",
//         //     marker: {
//         //         color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
//         //         opacity: [1, 0.8, 0.6, 0.4],
//         //         size: [40, 60, 80, 100]
//         //       },
//         //     name: name,
//         //     x: otuIds[i],
//         //     y: sampleValues[i]
//         //  };
//         // Plotly.newPlot("bubble", [trace]);
//         // }
    
    
        
//         // console.log(otuIds[0]);
//         // // console.log(sampleValues[0]);
//         // console.log(otuIds.length);
//         // console.log(sampleValues.length);
        
//     });
    
// };

// bubbleChart();

function bubbleChart(bubbleData){
  d3.json("data/samples.json").then(function(data) {
    var otuIds = data.samples[0].otu_ids;
    var sampleValues = data.samples[0].sample_values;
    var otuLables = data.samples[0].otu_labels;
    
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

}

bubbleChart();


// function demographicInfo() {
//   var dropdownMenu = d3.select("#selDataset");
//   var dataset = dropdownMenu.property("value");

//   // console.log(dataset);



// }
    
// demographicInfo();
