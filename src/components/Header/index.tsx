import { CustomLink, DesktopNavList, NavContainer } from './styles'
import { IgniteIcon } from '../icons/igniteIcon'
import { Scroll, Timer } from 'phosphor-react'

export function Header() {
  return (
    <NavContainer>
      <IgniteIcon />
      <DesktopNavList>
        <li>
          <CustomLink to="/" title="Timer">
            <Timer size={24} />
          </CustomLink>
        </li>
        <li>
          <CustomLink to="/history" title="Histórico">
            <Scroll size={24} />
          </CustomLink>
        </li>
      </DesktopNavList>
    </NavContainer>
  )
}
