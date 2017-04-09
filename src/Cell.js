import React from 'react';

export default class Cell extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { updateArray, cellId, status} = this.props;
    return (
      <div id={`cell-${cellId}`} onClick={() => updateArray(cellId)} style={{border: '1px solid #222', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {status}
      </div>
    )
  }
}
