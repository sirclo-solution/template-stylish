/* library package */
import { Logo } from '@sirclo/nexus'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const SideMenu = ({ openSide, toogleSide, children, positionSide }) => {
  return (
    <>
      <div className={openSide ? `side-menu fade show ${positionSide}` : `side-menu fade`}>
        <div className="header-side-menu">
          <Logo
            imageClassName="nav-logo"
            thumborSetting={{
              width: 400,
              format: 'webp',
              quality: 85
            }}
          />
          <FontAwesomeIcon
            className="icon text-white"
            style={{ transform: "translateY(17px)", fontSize: "16px" }}
            icon={faTimes}
            onClick={toogleSide}
          />
        </div>
        <hr className="side-menu-hr" />
        {children}
      </div>
      <div className="bg-outside" style={{ display: openSide ? 'block' : 'none' }} onClick={toogleSide}></div>
    </>
  )
}

export default SideMenu;