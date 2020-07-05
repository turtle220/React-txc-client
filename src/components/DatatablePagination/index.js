import React, { useState, useEffect } from 'react'
import { number, array, bool, func } from 'prop-types'
import {
  Pagination, PaginationItem, PaginationLink,
  UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem
} from 'reactstrap'

const DataTablePagination = ({
  page: defaultPage,
  defaultPageSize,
  pages,
  canPrevious,
  canNext,
  pageSizeOptions,
  showPageSizeOptions,
  onPageSizeChange,
  onPageChange,
  showPageJump
}) => {
  const [page, setPage] = useState(defaultPage)
  const [pageSize, setPageSize] = useState(defaultPageSize)

  useEffect(() => {
    setPage(defaultPage)
  }, [defaultPage])

  const getSafePage = (page) => Math.min(
    Math.max(
      Number.isNaN(page) ? defaultPage : page, 0
    ), pages - 1
  )

  const changePageSize = (size) => {
    onPageSizeChange(size)
    setPageSize(size)
  }

  const changePage = (page) => {
    const sagePage = getSafePage(page)
    setPage(sagePage)

    if (defaultPage !== sagePage) {
      onPageChange(sagePage)
    }
  }

  const pageClick = (pageIndex) => changePage(pageIndex)

  const renderPages = () => Array.from({ length: pages }).map((pg, index) => (
    <PaginationItem key={index} active={page === index}>
      <PaginationLink
        onClick={() => pageClick(index)}
      >{index + 1}
      </PaginationLink>
    </PaginationItem>
  ))

  const renderPageJump = () => pages.map((pg, index) => (
    <DropdownItem
      key={index}
      onClick={() => changePage(index)}
    >
      {index + 1}
    </DropdownItem>
  ))

  if (!pages.length) {
    return <div />
  }

  return (
    <>
      <div className="text-center">
        {
          showPageJump
          && (
          <div className="float-left pt-2"><span>Page </span>
            <UncontrolledDropdown className="d-inline-block">
              <DropdownToggle caret color="outline-primary" size="xs">
                {page + 1}
              </DropdownToggle>
              <DropdownMenu direction="left">
                {renderPageJump()}
              </DropdownMenu>
            </UncontrolledDropdown>
            <span> of </span>{pages}
          </div>
          )
        }

        <Pagination className="d-inline-block mt-3" size="sm" listClassName="justify-content-center" aria-label="Page navigation example">
          <PaginationItem className={`${!canPrevious && 'disabled'}`}>
            <PaginationLink
              className="prev"
              onClick={() => {
                if (!canPrevious) return
                changePage(page - 1)
              }}
              disabled={!canPrevious}
            >
              <i className="simple-icon-arrow-left" />
            </PaginationLink>
          </PaginationItem>

          {renderPages()}
          <PaginationItem className={`${!canNext && 'disabled'}`}>
            <PaginationLink
              className="next"
              onClick={() => {
                if (!canNext) return
                changePage(page + 1)
              }}
              disabled={!canNext}
            >
              <i className="simple-icon-arrow-right" />
            </PaginationLink>
          </PaginationItem>
        </Pagination>
        {
          showPageSizeOptions
          && (
          <div className="float-right pt-2">
            <span className="text-muted text-small mr-1">Items </span>
            <UncontrolledDropdown className="d-inline-block">
              <DropdownToggle caret color="outline-primary" size="xs">
                {pageSize}
              </DropdownToggle>
              <DropdownMenu right>
                {pageSizeOptions.map((size, index) => (
                  <DropdownItem
                    key={index}
                    onClick={() => changePageSize(size)}
                  >
                    {size}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          )
        }
      </div>
    </>
  )
}

DataTablePagination.propTypes = {
  page: number,
  defaultPageSize: number,
  pages: number,
  canPrevious: bool,
  canNext: bool,
  pageSizeOptions: array,
  showPageSizeOptions: bool,
  showPageJump: bool,
  onPageSizeChange: func,
  onPageChange: func
}

export default DataTablePagination
