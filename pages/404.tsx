/* library package */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useI18n } from '@sirclo/nexus';

/* components */
import Layout from 'components/Layout/Layout';

const lang = {
  en: {
    title: "Page not found",
    desc: "The link you are following may be broken, or the page has been deleted",
    back: "Back"
  },
  id: {
    title: "Halaman tidak ditemukan",
    desc: "Tautan yang anda ikuti mungkin rusak, atau halaman telah di hapus",
    back: "Kembali"
  }
}

const Error404Page: React.FC<any> = () => {
  const [lng, setLang] = useState<string>("en")
  const i18n: any = useI18n();

  useEffect(() => {
    const allowedLang = ['id', 'en'];
    const activeLang =
      (allowedLang.indexOf(window.location.pathname.substring(1, 3)) == -1)
        ? 'id'
        : window.location.pathname.substring(1, 3);

    setLang(activeLang)
  }, [])

  return (
    <Layout
      i18n={i18n}
      lng={lng}
    >
      <div className="error-pages">
        <div className="error-pages__container">
          <h2 className="error-pages__container--title">{lng && lang[lng].title}</h2>
          <p className="error-pages__container--desc">{lng && lang[lng].desc}</p>
          <Link href="/" as="/">
            <a className="btn login-page-btnLogin btn-long">{lng && lang[lng].back}</a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Error404Page;