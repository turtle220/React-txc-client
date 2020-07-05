import React, { useState } from 'react'
import {
  Collapse,
  Button
} from 'reactstrap'

const NoteItem = ({ note }) => {
  const {
    title,
    date,
    description
  } = note

  const [state, setState] = useState(false)
  return (
    <>
      <div className='border'>
        <Button
          block
          color='link'
          className='text-left'
          onClick={() => setState(!state)}
          aria-expanded={state}
        >
          {`${title}${date}`}
        </Button>
        <Collapse isOpen={state}>
          <div className='p-4'>
            {`${description}`}
          </div>
        </Collapse>
      </div>
    </>
  )
}

export default NoteItem
