import React, { useContext } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { Link } from 'react-router-dom'
import { AuthContext } from 'src/context/AuthContext'

const AppHeaderDropdown = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const loggedOut = [{ name: 'Login', route: '/login' }, { name: 'Sign Up', route: '/register' },];
  const loggedIn = [{ name: 'Profile', route: '/profile' }, { name: 'My Listings', route: '/myProperties' }, { name: 'Sell', route: '/sell' }, { name: 'Logout', route: '/logout' }];
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {isAuthenticated ? loggedIn.map((ele, i) => {
          return (<Link to={ele.route} key={i}>
            <CDropdownItem>
              <CIcon icon={cilCommentSquare} className="me-2" />
              {ele.name}
            </CDropdownItem>
          </Link>)
        }) : loggedOut.map((ele, i) => {
          return (
            <Link to={ele.route} key={i}>
              <CDropdownItem href={ele.route} key={i}>
                <CIcon icon={cilCommentSquare} className="me-2" />
                {ele.name}
              </CDropdownItem>
            </Link>
          )
        })}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
