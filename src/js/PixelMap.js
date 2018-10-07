import React from 'react'
import Pixel from './Pixel'
import styled from 'styled-components'
import times from 'lodash/times';

const MapWrapper = styled.div`

  border: 0px;
  backgroundColor: #ececec;
`

class PixelMap extends React.Component {
  
  constructor(props){
    super(props)
    this.selectionChange = this.selectionChange.bind(this);
  }
  
  selectionChange = (selectedValue, position, color) => {
    console.log("pixel map received selection change: " + selectedValue);
    this.props.onSelectionChange(selectedValue, position, color);
  }

  colorChange = (position, color) => {
    this.props.colorUpdate(position,color);
  }
  
  render() {

    const selectedPixelIndex = this.props.selectedpixelindex;

    return (
        <MapWrapper>
          
          {this.props.pixels.map((pixel, i) => {
            
            return(
              <Pixel 
                index = {i}
                key = {i}
                pixelData = {pixel}
                owned = {this.props.owner == pixel.owner ? true : false}
                selected = {i == selectedPixelIndex ? true : false}
                onSelect = {this.selectionChange}>
              </Pixel>
            )
          })}
        </MapWrapper>
    )
  }
}

export default PixelMap
