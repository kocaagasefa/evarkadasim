export const formDataUpdate = (formElements,value,key) => {
    const newFormElements= {
        ...formElements,
        [key]:{
            ...formElements[key],
            value,
            touched:true,
            isValid:validate(formElements[key].validityRules,value)
        }
    }
    if(formElements.confirmPassword&&key==="password"){
        newFormElements.confirmPassword={
            ...formElements.confirmPassword,
            validityRules:{
                ...formElements.confirmPassword.validityRules,
                equalTo:value
            }
        }
    }
    return newFormElements;
}

const validate = (validityRules,value) => {
    let valid = true;
    for (rule in validityRules){
        switch(rule) {
            case 'minLength':
            valid= valid && minLengthValidate(value,validityRules[rule]);
            break;
            case 'isEmail':
            valid = valid&& emailValidate(value);
            break;
            case 'equalTo':
            valid = valid && equalToValidate(value,validityRules[rule]);
            break;
            case 'min'  :
            valid = valid && minValidate(value,validityRules[rule]);
            break;
            default:
            valid = true;
        }
    }
    return valid;
}

const minLengthValidate=(value,minLength)=> {
    return value.length>=minLength;
}
const emailValidate= value => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value)

const equalToValidate = (value,checkValue) => {
    return value === checkValue;
}

const minValidate = (value,checkValue) => {
    return +value>= checkValue;
}