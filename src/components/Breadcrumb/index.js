import React from 'react'
import { object, string, func } from 'prop-types'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import IntlMessages from '@/utils/IntlMessages'

const isParam = (path) => path.includes(':')

const getMenuTitle = (sub, formatParam) => {
  if (isParam(sub)) {
    return formatParam ? formatParam() : null
  }

  return (
    <IntlMessages id={`menu.${sub}`} />
  )
}

const getUrl = (path, sub, index) => {
  if (index === 0) {
    return ''
  }
  return path.split(sub)[0] + sub
}

const BreadcrumbContainer = ({ heading, match, formatParam }) => (
  <>
    {heading && <h1><IntlMessages id={heading} /></h1>}
    <BreadcrumbItems match={match} formatParam={formatParam} />
  </>
)

export const BreadcrumbItems = ({ match, formatParam }) => {
  const path = match.path.substr(1)
  const paths = path.split('/')

  return (
    <>
      <Breadcrumb className="pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block">
        {paths.map((sub, index) => (
          <BreadcrumbItem key={index} active={paths.length === index + 1}>
            {paths.length !== index + 1 ? (
              <NavLink to={`/${getUrl(path, sub, index)}`}>
                {getMenuTitle(sub, formatParam)}
              </NavLink>
            ) : (
              getMenuTitle(sub, formatParam)
            )}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </>
  )
}

BreadcrumbContainer.propTypes = {
  heading: string,
  match: object.isRequired,
  formatParam: func
}

BreadcrumbItems.propTypes = {
  match: object.isRequired,
  formatParam: func
}

export default BreadcrumbContainer
