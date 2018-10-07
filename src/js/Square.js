import React from 'react'
import styled from 'styled-components'
import { TwitterPicker } from 'react-color';

const testColors = ["#00B1E1", "#37BC9B", "#8CC152", "#E9573F", "#F6BB42"];

const Wrapper = styled.div`
    width: 20px
    height: 20px
    border: 0px
    float: left
`;

const popover = {
    position: 'absolute',
    top: '10px',
    zIndex: '2',
  }

const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
}

class Square extends React.Component {

  state = {
    displayColorPicker: false,
    background: this.props.color
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
    this.props.onSelectionChange(this.props.index);
  };

  render() {

    return (
        <div>
            <Wrapper onClick={ this.handleClick } style={{backgroundColor: this.state.background}}></Wrapper>
            {this.state.displayColorPicker ? <div style={ popover }>
            <div style={ cover } onClick={ this.handleClose }/>
            <TwitterPicker
                color={ this.props.background }
                onChangeComplete={ this.handleChangeComplete }
            />
            </div> : null }
        </div>
    )
  }
}

export default Square
