import React from 'react'
import styled from 'styled-components'
import Square from './Square'

const PixelWrapper = styled.div`
  width: 66px;
  height: 66px;
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  '-webkit-box-shadow': '0 0px 0px rgba(0,0,0,0)'
`;


class Pixel extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      hover : false,
    }

    this.toggleHover = this.toggleHover.bind(this);
    this.receiveSelection = this.receiveSelection.bind(this);
  }

  toggleHover(){
    this.setState({hover: !this.state.hover})
  }

  toggleOn(){
    this.setState({hover: true})
  }

  toggleOff(){
    if (!this.props.selected){
       this.setState({hover: false})
    }
  }


  receiveSelection(newSelection, position, color){
    console.log("received new selection " + newSelection)
    this.props.onSelect(newSelection, position, color)
  }

  render() {

    //console.log(this.props.index, this.state.hover,this.props.selected )
    return (
        <PixelWrapper style={{
          
          'position': 'absolute', 
          'left': 66 * this.props.pixelData.x, 
          'top': 66 * this.props.pixelData.y,
          '-webkit-box-shadow': this.state.hover ? '0 5px 25px rgba(0,0,0,0.5)' : '0 0px 0px rgba(0,0,0,0)',
          'boder': this.state.owned ? '1px solid red' : '1px solid blue'}}
          onMouseEnter = {() => this.toggleOn()}

          onMouseLeave ={() => this.toggleOff()}
          >
              {/*TODO REFACTOR THIS WITH A MAP and make sure drawing is disabled*/}
              <Square index={this.props.index} position={0} color={this.getColor(0)} onSelectionChange={this.receiveSelection} drawingAllowed = {true}/>
              <Square index={this.props.index} position={1} color={this.getColor(1)} onSelectionChange={this.receiveSelection} drawingAllowed = {true}/>
              <Square index={this.props.index} position={2} color={this.getColor(2)} onSelectionChange={this.receiveSelection} drawingAllowed = {true}/>
              <Square index={this.props.index} position={3} color={this.getColor(3)} onSelectionChange={this.receiveSelection} drawingAllowed = {true}/>
              <Square index={this.props.index} position={4} color={this.getColor(4)} onSelectionChange={this.receiveSelection} drawingAllowed = {true}/>
              <Square index={this.props.index} position={5} color={this.getColor(5)} onSelectionChange={this.receiveSelection} drawingAllowed = {true}/>
              <Square index={this.props.index} position={6} color={this.getColor(6)} onSelectionChange={this.receiveSelection} drawingAllowed = {true}/>
              <Square index={this.props.index} position={7} color={this.getColor(7)} onSelectionChange={this.receiveSelection} drawingAllowed = {true}/>
              <Square index={this.props.index} position={8} color={this.getColor(8)} onSelectionChange={this.receiveSelection} drawingAllowed = {true}/>
        </PixelWrapper>
    )
  }

  getColor(index){
    if (!this.props.pixelData.colors){

      if ((index % 2) == 0)
        if ((this.props.index % 2) == 0)
          return '#f9f9f9';
        else if ((this.props.index % 2) != 0)
          return '#dfdfdf';
      else if ((index % 2) == 0)
        if ((this.props.index % 2) == 0)
          return '#fdfdfd';
        else if ((this.props.index % 2) != 0)
          return '#f9f9f9';
    }
    else{
      return this.props.pixelData.colors[index];
    }
  }
}

export default Pixel
