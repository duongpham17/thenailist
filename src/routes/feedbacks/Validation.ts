export interface Validation {
    name?: string,
    email?: string,
    feedback?: string,
}

export const validation = (values: Validation) => {
    let errors: Validation = {};

    const check = (key: any) => key in values;

    if(check("name")){
        if(!values.name) {
            errors.name = "*";
        }
    } 
    if(check("email")){
        if(!values.email) {
            errors.email = "required";
        }
        else if(!/\S+@\S+\.\S+/.test(values.email)){
            errors.email = "Invalid email address"
        }
    } 
    if(check("feedback")){
        if(!values.feedback) {
            errors.feedback = "*";
        }
    } 

    return errors
}

export default validation