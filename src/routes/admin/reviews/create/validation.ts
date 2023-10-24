export interface Validation {
    name?: string,
}

export const validation = (values: Validation) => {
    let errors: Validation = {};

    const check = (key: any) => key in values;

    if(check("name")){
        if(!values.name) {
            errors.name = "*";
        }
    } 

    return errors
}

export default validation