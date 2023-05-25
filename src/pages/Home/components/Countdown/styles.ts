import styled from 'styled-components'

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme['gray-100']};

  display: flex;
  gap: 1rem;

  span {
    background-color: ${(props) => props.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }

  @media (max-width: 500px) {
    font-size: 7rem;
    line-height: 4rem;
    gap: 0.5rem;

    span {
      padding: 3rem 1rem;
    }
  }
`

export const Separator = styled.div`
  padding: 2rem;
  color: ${(props) => props.theme['green-500']};

  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  top: -14px;

  @media (max-width: 500px) {
    top: -6px;
  }
`
