import React from 'react';
import Cell from './Cell';
import Info from './Info';
import styled from 'styled-components';

const Grid = styled.div`
  width: 310px; 
  display: flex; 
  align-items: center;
  justify-content: flex-start; 
  flexWrap: wrap;
`
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  height: 100vh;
`
const Restart = styled.div`
  box-shadow: inset 0 0 0 0 #59C9A5;
  color: #000;
  transition: all .3s ease-in;
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    color: #FFF;
    box-shadow: inset 100px 0 0 0 #59C9A5;
  }
`
const Winner = styled.h1`
  margin: 32px;
  color: #D81E5B;
`

const getInitState = () => ({
  arr: [...new Array(9)].reduce((pre, cur, index) => {
    pre[index]=''
    return pre
  }, {}),  
  turn : false,
  winner: false,
})
export default class Game extends React.Component {
  state = getInitState();

  componentDidUpdate() {
    if(this.getResult() && !this.state.winner) {
      this.setState({winner: true})  
    }
  }

  checkArray = () => {
    const { arr } = this.state;
    return Object.keys(arr).reduce(
      (pre, cur) => pre && arr[cur] !==''
    , true)
  }

  getResult = () => {
    const { calculateResult } = this;
    return calculateResult([0, 3, 6], 1) ||
      calculateResult([0, 1, 2], 3) ||
      calculateResult([0], 4) ||
      calculateResult([2], 2) 
  }

  calculateResult = (startPoint, offset) => {
    const { arr } = this.state;
    
    return startPoint.reduce(
      (pre, cur) => {
        const a = arr[cur];
        const b = arr[cur + offset];
        const c = arr[cur + offset*2];
        return pre || (a === b && b === c && a !== '')
      }, false
    ) 
  }

  updateArray = (cellId) => {
    if (!this.state.arr[cellId]) {
      this.setState({
        turn: !this.state.turn,
        arr: {...this.state.arr, [cellId]: this.state.turn ? 'O' : 'X'} 
      })
    }
  }

  restart = () => this.setState(getInitState())
  
  render() {
    const { arr, turn, winner } = this.state;
    return (
      <section>
        {
          !winner ? 
          <Container>
            <Info turn={turn ? 'O' : 'X'} />
            <Grid>
            {
              Object.keys(arr).map( 
                (arrId) => <Cell key={arrId} cellId={arrId} status={arr[arrId]} updateArray={this.updateArray}/> 
              )
            }
            </Grid>
            {
              !this.getResult() && this.checkArray() ? 
                <Restart onClick={this.restart} > Restart </Restart> : null
            }
          </Container> : 
          <Container>
            <Winner>Winner {!this.state.turn ? 'O' : 'X'} </Winner>
            <Restart onClick={this.restart} > Restart </Restart>
          </Container>
        }
      </section>
    )
  }
}
