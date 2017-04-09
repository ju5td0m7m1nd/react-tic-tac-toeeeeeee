import React from 'react';
import styled from 'styled-components';

const CellBlock = styled.div`
  border: 1px solid #D81E5B;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .3s ease-in;
  font-size: ${props => props.active ? '36px' : '18px'}
`

export default class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
    }
  }

  handleClick = () => {
    const { updateArray, cellId } = this.props;
    updateArray(cellId); 
    setTimeout(() => this.setState({active: false}), 500)
  }

  render() {
    const { cellId, status} = this.props;
    const { active } = this.state;
    return (
      <CellBlock id={`cell-${cellId}`} onClick={this.handleClick} active={active}>
        {status}
      </CellBlock>
    )
  }
}
