import * as React from 'react'
import type { IUrlMapping } from 'src/interfaces/Wireframes'
import LinkIcon from '@mui/icons-material/Link'
import { HoverBox, HoverBoxScrollWrapper, Trigger, UrlItem, Wrapper } from './UrlMappedCell.styles'

export type UrlLike = string | IUrlMapping

export interface UrlMappedCellProps {
  urls: UrlLike[]
  className?: string
  emptyPlaceholder?: string
}

export const UrlMappedCell: React.FC<UrlMappedCellProps> = ({ urls, className = '', emptyPlaceholder = '—' }) => {
  if (!urls || urls.length === 0) return <span className={className}>{emptyPlaceholder}</span>

  const countLabel = `${urls.length} URL${urls.length === 1 ? '' : 's'}`

  const getUrlString = (u: UrlLike) => {
    if (!u) return ''
    if (typeof u === 'string') return u
    return u.pageUri ?? u.slug ?? ''
  }

  return (
    <Wrapper className={className}>
      <Trigger aria-haspopup="true" aria-expanded={false}>{countLabel}</Trigger>

      <HoverBox role="menu">
        <HoverBoxScrollWrapper>
        {urls.map((u) => {
          const urlStr = getUrlString(u)
          return (
            <UrlItem className="url-item" key={urlStr} title={urlStr}>
              <a href={urlStr} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <LinkIcon fontSize="medium" />
                <span className="url-text">{urlStr}</span>
              </a>
            </UrlItem>
          )
        })}
        </HoverBoxScrollWrapper>
      </HoverBox>
    </Wrapper>
  )
}
