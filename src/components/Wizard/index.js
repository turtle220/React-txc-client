import React, { Children } from 'react'
import { array, node, arrayOf } from 'prop-types'
import cx from 'classnames'
import {
  Nav,
  NavItem
} from 'reactstrap'
import { NavLink } from 'react-router-dom'
import useStepper from '@/hooks/useStepper'

import Buttons from './Buttons'

const Wizard = ({ stepsTitle, children }) => {
  const steps = Children.toArray(children)

  const {
    currentStep,
    isFirstStep,
    isLastStep,
    goToNextStep,
    goToBackStep,
    currentStepIndex
  } = useStepper(steps)

  return (
    <div className="wizard wizard-default">
      <Nav tabs className="nav disabled justify-content-center ml-0 mb-5">
        {stepsTitle.map((title, index) => (
          <NavItem
            key={index}
            className={cx({
              'step-doing': currentStepIndex === index,
              'step-done': currentStepIndex > index
            })}
          >
            <NavLink
              activeClassName=""
              className="nav-link"
              to="#"
            >
              {title}
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <div>
        {React.cloneElement(currentStep, {
          ...currentStep.props,
          isFirstStep,
          isLastStep,
          goToNextStep,
          goToBackStep
        })}
      </div>
    </div>
  )
}

Wizard.propTypes = {
  stepsTitle: array.isRequired,
  children: arrayOf(node).isRequired
}

export { Buttons }
export default Wizard
