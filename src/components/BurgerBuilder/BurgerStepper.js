import React, {Fragment} from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

function getSteps() {
  const { t } = useTranslation();

  const selectIngredients = t('selectIngredients', 'Select ingredients');
  const checkout = t('checkout', 'Checkout');
  const confirmOrder = t('confirmOrder', 'Confirm order');

  return [selectIngredients, checkout, confirmOrder];
}

const burgerStepper = props => {
    const activeStep = useSelector(state => state.burgerStepper.activeStep);
    const displayBurgerStepper = useSelector(state => state.burgerStepper.display);

    const steps = getSteps();

    let burgerStepper = null;

    if (displayBurgerStepper) {
      burgerStepper = (
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      );
    }

  return (
      <Fragment>
        {burgerStepper}
      </Fragment>
  );
};

export default burgerStepper;