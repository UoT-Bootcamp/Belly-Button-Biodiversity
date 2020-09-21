d3.json("data/samples.json").then((incomingData) => console.log(incomingData));


function bubbleChart(){
    d3.json("data/samples.json").then(function(data) {

        var sampleArray = data.samples;

        var otuId = [];
        var sampleValue = [];
        var otuLabel = [];
        for (i = 0; i < sampleArray.length; i++) {
            
            otuId.push(sampleArray[i].otu_ids);
            sampleValue.push(sampleArray[i].sample_values);
            otuLabel.push(sampleArray[i].otu_labels);   
          }
        
          var otuIds = [].concat.apply([], otuId);
          var sampleValues = [].concat.apply([], sampleValue);
          var otuLabels = [].concat.apply([], otuLabel);

          // console.log(otuIds);
          // console.log(sampleValues);
          // console.log(otuLabels);
          var trace = {
            x: otuIds,
            y: sampleValues,
            mode: "markers",
            marker: {
                color: otuIds,
   
                size: sampleValues,
                sizeref: 2,
                sizemode: 'area'
              },
            text: otuLabels
            

         };
        Plotly.newPlot("bubble", [trace]);



        // for (i = 0; i< otuIds.length; i++) {
        //  var trace = {
        //     mode: "markers",
        //     marker: {
        //         color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
        //         opacity: [1, 0.8, 0.6, 0.4],
        //         size: [40, 60, 80, 100]
        //       },
        //     name: name,
        //     x: otuIds[i],
        //     y: sampleValues[i]
        //  };
        // Plotly.newPlot("bubble", [trace]);
        // }
    
    
        
        // console.log(otuIds[0]);
        // // console.log(sampleValues[0]);
        // console.log(otuIds.length);
        // console.log(sampleValues.length);
        
    });
    
};

bubbleChart();
    
