/* library package */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const DropdownNav = ({ title, children }) => {
  const router = useRouter();
  const [isDropdown, setDropdown] = useState<boolean>(false);

  useEffect(() => {
    setDropdown(false);
  }, [router.query]);

  const handleOutside = () => {
    if (isDropdown) setDropdown(false);
  }

  return (
    <>
      <div className="dropdown inline px-4 d-flex align-items-center line-stylish">
        <button
          className="btn dropdown-toggle btn-dropdown text-white"
          type="button"
          onClick={() => setDropdown(!isDropdown)}
        >
          {title}
        </button>
        <div className="dropdown-menu dropdown-menu-right dropdown-stylish" style={{ display: isDropdown ? 'block' : 'none' }}>
          {children}
        </div>
        <div className="bg-outside" style={{ display: isDropdown ? 'block' : 'none' }} onClick={() => handleOutside()}></div>
      </div>
    </>
  )
}

export default DropdownNav;
