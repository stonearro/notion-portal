import Collapse from '@/components/Collapse'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

/**
 * 折叠菜单
 * @param {*} param0
 * @returns
 */
export const LinkMenuItemCollapse = (props) => {
  const { link } = props
  const [show, changeShow] = useState(false)
  link.subMenus = link.subMenus || link.children
  const hasSubMenu = link?.subMenus?.length > 0

  const [isOpen, changeIsOpen] = useState(false)

  const router = useRouter()

  if (!link || !link.show) {
    return null
  }

  const selected = (router.pathname === link.to) || (router.asPath === link.to)

  const toggleShow = () => {
    changeShow(!show)
  }

  const toggleOpenSubMenu = () => {
    changeIsOpen(!isOpen)
  }

  return <>
    <div className={(selected ? 'bg-gray-600 text-white hover:text-white' : 'hover:text-gray-600') + ' px-5 w-full text-left duration-200 dark:bg-hexo-black-gray dark:border-black'} onClick={toggleShow} >

      {!hasSubMenu && <Link href={link?.to} className='dark:text-gray-200 py-2 w-full my-auto items-center justify-between flex  '>
        <div><div className={`${link.icon} text-center w-4 mr-4`} />{link.title}</div>
      </Link>}

      {hasSubMenu && <div
        onClick={hasSubMenu ? toggleOpenSubMenu : null}
        className="py-2 font-extralight flex justify-between cursor-pointer  dark:text-gray-200 no-underline tracking-widest">
        <div><div className={`${link.icon} text-center w-4 mr-4`} />{link.title}</div>
        <div className='inline-flex items-center '><i className={`px-2 fas fa-chevron-right transition-all duration-200 ${isOpen ? 'rotate-90' : ''}`}></i></div>
      </div>}
    </div>

    {/* 折叠子菜单 */}
    {hasSubMenu && <Collapse isOpen={isOpen} onHeightChange={props.onHeightChange}>
      {link.subMenus.map(sLink => {
        return <div key={sLink.id} className='whitespace-nowrap dark:text-gray-200
              not:last-child:border-b-0 border-b dark:border-gray-800 py-2 px-14 cursor-pointer hover:bg-gray-100
              font-extralight dark:bg-black text-left justify-start text-gray-600 bg-gray-50 dark:hover:bg-gray-900 tracking-widest transition-all duration-200'>
          <Link href={sLink.to}>
            <div><div className={`${sLink.icon} text-center w-3 mr-3 text-xs`} />{sLink.title}</div>
          </Link>
        </div>
      })}
    </Collapse>}
  </>
}
