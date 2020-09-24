// Change the demographic Info
function demographicInfo(sample){
  var metadataInfo = d3.select("#sample-metadata");
  d3.json("data/samples.json").then((incomingData) => {
    // Clear the node if data is present
    metadataInfo.html("");
    var metadataVar = incomingData.metadata;
    var resultList = metadataVar.filter(sampleObject => sampleObject.id == sample);
    var result = resultList[0];
    var washfrequency = result.wfreq
    Object.entries(result).forEach(([key, value]) => {
      metadataInfo.append("h6").text(`${key} : ${value}`);
  });
  gaugeChart(washfrequency);
});
};



// Build the bar chart
function barChart(barId){
  d3.json("data/samples.json").then(incomingData => {
    var sampleData = incomingData.samples;
    var sampleList = sampleData.filter(sampleObject => sampleObject.id == barId);    
    var finalList = sampleList[0];
    var otuIds = finalList.otu_ids.slice(0, 10).reverse();
    var sampleValues = finalList.sample_values.slice(0, 10).reverse();
    var otuLables = finalList.otu_labels.slice(0, 10).reverse();
    var finalOtuIds = otuIds.map(d => 'OTU' + ' ' + d);
    
    trace = {
      type: "bar",
      x: sampleValues,
      y: finalOtuIds,
      text: otuLables,
      orientation: "h", 
    }

    var layout = {
      title: "Top 10 OTUs in Subject ID No.- " + barId,
      xaxis: {
        title: "Sample Values"
        } 
     }

    Plotly.newPlot("bar", [trace], layout);
  });
};



// Plot bubble chart
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
      size: sampleValues,
      colorscale : "Earth"
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



function gaugeChart(gaugeID){
  // Create the trace
  var trace = {
    domain: { x: [0, 1], y: [0, 1] },
    value: gaugeID,
    type: "indicator",
    mode: "gauge+number",
    gauge: {
      axis: { range: [0, 9] },
      steps: [
        { range: [0, 4.5], color: "lightyellow" },
        { range: [4.5, 9], color: "lightblue" }
        ]
      },
      title: { text: 
        "Belly Button Washing Frequency<br><span style='font-size:0.8em;color:black'>Scrubs per Week</span>"
         }
  }; 
  // Define the layout
  var layout = { 
    width: 600, 
    height: 450, 
    margin: { t: 0, b: 0 }
    };
    
  // Plot the gauge chart
  Plotly.newPlot('gauge', [trace], layout);
};



// Initiate the dashboard
function init(){
  var selector = d3.select("#selDataset");
  d3.json("data/samples.json").then(incomingData => {
    var sampleNames = incomingData.names;
    sampleNames.forEach(sample => {
                        selector.append("option")
                                .text(sample)
                                .property("value", sample);
                      });
    var firstSample = sampleNames[0];
    demographicInfo(firstSample);
    barChart(firstSample);
    bubbleChart(firstSample);
  });
};



// This function change on change of OTU ID
function optionChanged(changedSample){
  demographicInfo(changedSample);
  barChart(changedSample);
  bubbleChart(changedSample);
};



// Initiate the web page
init()
