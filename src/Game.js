import React from 'react';
import Cell from './Cell';
import Info from './Info';

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
          <div>
            <Info turn={turn ? 'O' : 'X'} />
            <div style={{width: '310px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
            {
              Object.keys(arr).map( 
                (arrId) => <Cell cellId={arrId} status={arr[arrId]} updateArray={this.updateArray}/> 
              )
            }
          </div>
          </div> : 
          <div>
            <h1>Winner {!this.state.turn ? 'O' : 'X'} </h1>
            <div onClick={this.restart} > Restart </div>
          </div>
        }
      </section>
    )
  }
}
