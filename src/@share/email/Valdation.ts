export interface Validation {
    email?: string,
    first_name?: string,
    subject?: string,
    last_name?: string,
    message?: string,
}

export const validation = (values: Validation) => {
    let errors: Validation = {};

    const check = (key: any) => key in values;

    if(check("first_name")){
        if(!values.first_name) {
            errors.first_name = "*";
        }
    } 
    if(check("last_name")){
        if(!values.last_name) {
            errors.last_name = "*";
        }
    } 
    if(check("email")){
        if(!values.email) {
            errors.email = "*";
        }
        else if(!/\S+@\S+\.\S+/.test(values.email)){
            errors.email = "Invalid email address"
        }
    } 
    if(check("subject")){
        if(!values.subject) {
            errors.subject = "*";
        }
    } 
    if(check("message")){
        if(!values.message) {
            errors.message = "*";
        }
    } 

    return errors
}

export default validation