export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const checkValidity = (value, rules) => {
    let isValid = true
    if (!rules) {
        return true
    }

    if (rules.required) {
        isValid = isValid && value.trim() !== ''
    }

    if (rules.minLength) {
        isValid = isValid && value.trim().length >= rules.minLength
    }

    if (rules.maxLength) {
        isValid = isValid && value.trim().length <= rules.maxLength
    }

    if (rules.isEmail) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isValid = isValid && re.test(String(value).toLowerCase())
    }

    if (rules.isNumeric) {
        const re = /^\d+$/;
        isValid = isValid && re.test(String(value))
    }
    return isValid
}