import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
`

export const DesktopNavList = styled.ul`
  display: flex;
  gap: 0.5rem;
  list-style: none;
  margin-left: auto;
`

export const CustomLink = styled(NavLink)`
  width: 3rem;
  height: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;

  text-decoration: none;
  color: ${(props) => props.theme['gray-100']};

  box-shadow: 0 -3px 0 transparent inset;

  &:hover {
    transition: box-shadow 0.2s;
    box-shadow: 0 -3px 0 ${(props) => props.theme['green-500']} inset;
  }

  &.active {
    color: ${(props) => props.theme['green-500']};
  }
`
