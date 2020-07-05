import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { useRouteMatch } from 'react-router-dom'
import { Row, Card, CardBody } from 'reactstrap'
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import ReactTable from 'react-table'
import { useSelector } from 'react-redux'

import { defaultPageSize, minRows } from '@/constants/defaultTableConfig'

import { Colxx, Separator } from '@/components/CustomBootstrap'
import Breadcrumb from '@/components/Breadcrumb'
import PageLoader from '@/components/PageLoader'
import DataTablePagination from '@/components/DatatablePagination'

import getTdProps from '@/utils/getTdProps'

import { TASKS_QUERY } from '@/graphql/queries/workflows'
import { MEMBERS_QUERY } from '@/graphql/queries/members'

import tableColumns from './tableColumns'
import AutoCompleteFilter from './AutoCompleteFilter'

// eslint-disable-next-line react/prop-types
const CustomTbodyComponent = ({ className, children, ...rest }) => (
  <div {...rest} className={classnames('rt-tbody', className || [])}>
    <PerfectScrollbar option={{ suppressScrollX: true }}>
      {children}
    </PerfectScrollbar>
  </div>
)

const Tasks = () => {
  const client = useApolloClient()
  const [loading, setLoading] = useState(false)
  const [taskList, setTaskList] = useState([])
  const [selectedMemberId, setSelectedMemberId] = useState('')
  const [memberOptions, setMemberOptions] = useState([])
  const [allTasksValue, setAllTasksValue] = useState(false)
  const statusOptions = [
    {
      value: 'PENDING',
      label: 'Pending'
    },
    {
      value: 'COMPLETED',
      label: 'Completed'
    }
  ]
  const [selectedStatus, setSelectedStatus] = useState('')

  const {
    docusignModalClosed
  } = useSelector(({ docusign }) => docusign)

  const fetchTasks = async ({ memberId, status, allTasks }) => {
    setLoading(true)

    const { data } = await client.query({
      query: TASKS_QUERY,
      variables: {
        memberId,
        status,
        allTasks
      },
      fetchPolicy: 'no-cache'
    })

    setTaskList(data.tasks)
    setLoading(false)
  }

  taskList.sort((a, b) => a.id - b.id)

  const fetchMembers = async () => {
    const { data: { members } } = await client.query({
      query: MEMBERS_QUERY,
      variables: {
        approved: true
      }
    })

    setMemberOptions(members.map((seller) => ({
      value: seller.id,
      label: seller.companyName
    })))
  }

  const filterTasks = (value, statusValue, allTasks) => {
    fetchTasks({ memberId: value, status: statusValue, allTasks })
    setSelectedMemberId(value)
    setSelectedStatus(statusValue)
    setAllTasksValue(allTasks)
  }

  const resetFilter = () => {
    fetchTasks({})
    setSelectedMemberId('')
    setSelectedStatus('')
    setAllTasksValue(false)
  }

  useEffect(() => {
    fetchTasks({})
    fetchMembers()
  }, [])

  useEffect(() => {
    if (docusignModalClosed) {
      fetchTasks({})
    }
  }, [docusignModalClosed])

  const match = useRouteMatch()
  const handleRowClick = (id) => {
    console.log(id)
  }

  return (
    <Row>
      <Colxx xxs='12'>
        <Breadcrumb heading='menu.tasks' match={match} />
        {!loading && (
          <AutoCompleteFilter
            title='Member'
            onFilter={filterTasks}
            value={selectedMemberId}
            statusValue={selectedStatus}
            onReset={resetFilter}
            options={memberOptions}
            statusOptions={statusOptions}
            allTasksValue={allTasksValue}
          />
        )}
        <Separator className='mb-5' />
      </Colxx>

      <Colxx xxs='12'>
        {loading ? (
          <PageLoader />
        ) : (
          <Card>
            <CardBody>
              <ReactTable
                data={taskList}
                TbodyComponent={CustomTbodyComponent}
                columns={tableColumns}
                defaultPageSize={defaultPageSize}
                minRows={minRows}
                showPageJump={false}
                showPageSizeOptions={false}
                PaginationComponent={DataTablePagination}
                getTdProps={getTdProps(handleRowClick)}
                className='-highlight react-table-fixed-height'
                multiSort={false}
              />
            </CardBody>
          </Card>
        )}
      </Colxx>
    </Row>
  )
}

export default Tasks
