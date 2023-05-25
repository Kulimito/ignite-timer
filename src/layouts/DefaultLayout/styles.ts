import styled from 'styled-components'

export const LayoutContainer = styled.div`
  overflow: hidden;

  max-width: 75rem; /* 1120px(70rem) + 2 x 40px (5rem) */
  height: calc(100vh - 10rem);
  margin: 5rem auto;
  padding: 2.5rem;

  background-color: ${(props) => props.theme['gray-800']};
  border-radius: 8px;

  display: flex;
  flex-direction: column;

  @media (max-width: 780px) {
    margin: 0 auto;
    height: 100vh;
    border-radius: 0;
  }
`
