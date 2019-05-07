class FormService {
    handleFieldErrors(errors, actions) {
        errors.map((error) => {
            for (let key in error) {
                actions.setFieldTouched(key, true, false);
            }
        });
    }

    invalidStatus(field, touched, errors, componentErrors) {
        const fieldTouched = touched[field] ? true : false;
        const firstErrorCheck = errors[field] !== undefined;
        const secondErrorCheck = errors[field + '0'] !== undefined;
        let stateErrorCheck = false;
        if (componentErrors.length > 0) {
            componentErrors.map((error) => {
                for (let key in error) {
                    if (key === field) {
                        stateErrorCheck = true;
                    }
                }
            });
        }
        if (fieldTouched && (firstErrorCheck || secondErrorCheck || stateErrorCheck)) {
            return true;
        } else {
            return false;
        }
    }

    compileErrors(field, errors, componentErrors) {
        const allErrors = [];
        for (let key in errors) {
            if (key.startsWith(field)) {
                allErrors.push({
                    [field]: errors[key]
                });
            }
        }
        return(
            <ul>
                {allErrors.map((error, index) => {
                    return <li key={index}>{error[field]}</li>
                })}
                {componentErrors.length > 0 && componentErrors.map((error, index) => {
                    for (let key in error) {
                        if (error[field] && (! errors[key] || errors[key] !== error[key])) {
                            return <li key={index}>{error[field]}</li>
                        }
                    }
                })}
            </ul>
        );
    }

    customOnChange = (handleChange, componentErrors) => (event) => {
        handleChange(event);
        let errors = componentErrors;
        if (errors.length > 0) {
            errors.map((error, index) => {
                for (let key in error) {
                    if (key === event.target.name) {
                        errors.splice(index, 1);
                    }
                }
            });
        }
    }
}

export default new FormService();