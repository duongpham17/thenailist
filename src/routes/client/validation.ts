export interface Validation {
    email?:string,
    phone?:string,
    first_name?: string,
    last_name?: string,
    address?: string,
    city?: string,
    postcode?: string,
    date_of_birth?: string,
}

export const validation = (values: Validation) => {
    let errors: Validation = {};

    const check = (key: any) => key in values;


    if(check("email")){
        if(!values.email) {
            errors.email = "*";
        };
    } 

    if(check("phone")){
        if(!values.phone) {
            errors.phone = "*";
        };
    } 

    if(check("first_name")){
        if(!values.first_name) {
            errors.first_name = "*";
        };
    } 

    if(check("last_name")){
        if(!values.last_name) {
            errors.last_name = "*";
        };
    } 

    if(check("address")){
        if(!values.address) {
            errors.address = "*";
        };
    } 

    if(check("city")){
        if(!values.city) {
            errors.city = "*";
        };
    } 

    if(check("postcode")){
        if(!values.postcode) {
            errors.postcode = "*";
        };
    } 


    if(check("date_of_birth")){
        if(!values.date_of_birth) {
            errors.date_of_birth = "*";
        };
    } 

    return errors
}

export default validation;