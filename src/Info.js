import React from 'react';
import styled from 'styled-components';

const Text = styled.h1`
  color: #23395B;
  box-sizing: border-box;
  padding: 16px;
`

export default ({turn}) => {
  return (
    <Text>{`輪到 ${turn} 了`}</Text>
  )
}
