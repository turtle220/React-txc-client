import React from 'react'
import { bool, func, string } from 'prop-types'
import { Button } from 'reactstrap'
import Loader from '@/components/Loader'

const Buttons = ({
  prevButtonDisabled,
  nextButtonDisabled,
  goToBackStep,
  goToNextStep,
  customNextLabel = 'Next',
  customPrevLabel = 'Prev',
  nextButtonLoading,
  registerConcluded,
  populateStep,
}) => {
  const userLogged = JSON.parse(localStorage.getItem('@txc/USER_LOGGED'))

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <Button
          disabled={prevButtonDisabled}
          onClick={goToBackStep}
          className="mr-1"
        >
          {customPrevLabel}
        </Button>
        <Button
          disabled={nextButtonDisabled}
          onClick={goToNextStep}
        >
          {!nextButtonLoading ? customNextLabel : (
            <Loader size={20} />
          )}
        </Button>
      </div>
      <div className="text-right mt-5">
        {populateStep && !registerConcluded && !process.env.REACT_APP_HIDE_AUXIARY_FIELD && (
          <Button size="xs" color="primary" onClick={populateStep}>
            COMPLETE THIS STEP FIELDS {userLogged?.registerConcluded}
          </Button>
        )}
      </div>
    </>
  )
}

Buttons.propTypes = {
  prevButtonDisabled: bool,
  nextButtonDisabled: bool,
  goToBackStep: func,
  goToNextStep: func,
  customNextLabel: string,
  customPrevLabel: string,
  nextButtonLoading: bool,
  registerConcluded: bool,
  populateStep: func,
}

export default Buttons
