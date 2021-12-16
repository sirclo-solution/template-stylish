/* library package */
import { FC } from 'react'
import Link from 'next/link'

export type PageHeadingPropsType = {
  title: string
  links: Array<string>
  withImage?: string
  lng: any
}


const Breadcrumb: FC<any> = ({
  title,
  links,
  withImage,
  lng
}) => {
  return (
    <div>
    {withImage ? <div
      className={`section-breadcrumb ${withImage ? "section-breadcrumb__image" : ""}`}
      style={{ backgroundImage: `url(${withImage})` }}
    >
      <h1 className="section-breadcrumb__title">{title}</h1>
    </div> : null}
    <div className="section-breadcrumb" >
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb breadcrumb-stylish">
          {
            links.map((el, idx) => {
              if (el === "Home" || el === "Beranda") {
                return (
                  <li className="breadcrumb-item breadcrumb-stylish-item" key={idx}>
                    <Link href="/[lng]" as={`/${lng}`}>
                      <a className="breadcrumb-stylish-item__link">{el}</a>
                    </Link>
                  </li>
                )
              }

              if (idx === (links.length - 1)) {
                return (
                  <li className="breadcrumb-item breadcrumb-stylish-item" key={idx}>
                    <a className="breadcrumb-stylish-item__link font-weight-bold">{el}</a>
                  </li>
                )
              }
              else {
                return (
                  <li className="breadcrumb-item breadcrumb-stylish-item" key={idx}>
                    <a className="breadcrumb-stylish-item__link">{el}</a>
                  </li>
                )
              }
            })
          }
        </ol>
      </nav>
      </div>
    </div>
  )
}

export default Breadcrumb;