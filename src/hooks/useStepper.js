import { useState } from 'react'

const useStepper = (steps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFirstStep, setFirstStep] = useState(true)
  const [isLastStep, setLastStep] = useState(false)
  const totalCount = steps.length - 1

  const goToNextStep = () => {
    const nextIndex = currentIndex + 1

    if (nextIndex <= totalCount) {
      setCurrentIndex(nextIndex)
    }

    setLastStep(nextIndex === totalCount)
    setFirstStep(false)
  }

  const goToBackStep = () => {
    const nextIndex = currentIndex - 1

    if (nextIndex >= 0) {
      setCurrentIndex(nextIndex)
    }

    setFirstStep(nextIndex === 0)
    setLastStep(false)
  }

  const goToStep = (stepIndex) => {
    if (stepIndex < 0 || stepIndex > totalCount) {
      return
    }

    setCurrentIndex(stepIndex)
    setFirstStep(stepIndex === 0)
    setLastStep(stepIndex === totalCount)
  }

  return {
    currentStep: steps[currentIndex],
    isFirstStep,
    isLastStep,
    goToNextStep,
    goToBackStep,
    goToStep,
    currentStepIndex: currentIndex
  }
}

export default useStepper
