import { useEffect } from 'react'

export function usePageTitle(pageTitle?: string) {
  useEffect(() => {
    document.title = pageTitle
      ? `${pageTitle} | Altar & Sound`
      : 'Altar & Sound — Musicians of Faith'
  }, [pageTitle])
}
