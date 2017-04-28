import styled from 'styled-components';

export const Svg = styled.svg`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  &:not(:root) {
    overflow: visible;
  }
`;
