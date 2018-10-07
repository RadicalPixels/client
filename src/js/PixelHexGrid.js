
import React from 'react'
import styled from 'styled-components'
import HexagonGrid from 'react-hexagon-grid';
import times from 'lodash/times';

class PixelHexGrid extends React.Component {
  
 

  renderHexagonContent(hexagon) {
    return (
      <text
        x="45%"
        y="60%"
        opacity={hexagon.opacity}
        fontSize={100}
        fontWeight="lighter"
        style={{ fill: 'blue' }}
        textAnchor="middle"
      >
        {hexagon.color}
      </text>
    );
  }

  getHexProps(hexagon) {
    return {
      style: {
        fill: 'green',
        stroke: 'orange',
        opacity: hexagon.opacity
      },
      onClick: () => alert(`Hexagon n.${hexagon} has been clicked`)
    };
  }
  
  render() {

    return (
        <div>
           <HexagonGrid
            gridWidth="300"
            gridHeight="300"
            hexagons={this.props.pixels}
            hexProps={this.getHexProps}
            renderHexagonContent={this.renderHexagonContent}
          />
        </div>
    )

    
  }
}

export default PixelHexGrid
