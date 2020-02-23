export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const validateFormInput = (value, rules) => {
    let isValid = true;
    
    if (rules) {
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
            if (!isValid) {
                return {
                    result: false,
                    reason: 'Required'
                }
            }
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
            if (!isValid) {
                return {
                    result: false,
                    reason: 'Min length not met'
                }
            }
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
            if (!isValid) {
                return {
                    result: false,
                    reason: 'Max length exceeded'
                }
            }
        }

        if (rules.contains) {
            isValid = value.includes(rules.contains) && isValid;
            if (!isValid) {
                return {
                    result: false,
                    reason: 'Not a valid email address'
                }
            }
        }
    }

    return {
        result: isValid,
        reason: ''
    };
};