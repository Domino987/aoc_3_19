import React from 'react';
import Plot from 'react-plotly.js';


const Chart = ({ data }) => <Plot
    data={data}
    layout={{ width: '100%', height: '100%' }}
/>


export default Chart;