    export type fieldDataProp = Array<{
        name: string,
        value: string,
    }>;

export const formValidate = (fields = {}, touchInput='')=>{
    const fieldData: fieldDataProp = Object.entries(fields).map(([name, value])=>({name, value})) as fieldDataProp;
    const dataError: {
        touched: {
            [key: string]: boolean
        },
        errors: {
            [key: string]: string
        },
        hasError: boolean,
    } = {
        touched: {},
        errors: {},
        hasError: false,
    }

    if(!touchInput){
        fieldData.forEach((field)=>{
            dataError.touched[field.name] = true;
        });
    }else{
        dataError.touched[touchInput] = true;
    }
    fieldData.forEach((field)=>{
        const {name, value} = field;
        if(dataError.touched[name]){
            const error = validate.required(value)
            dataError.errors[name] = error||"";

            // if email 
            if(name === 'email'){
                const error = validate.email(value)
                dataError.errors[name] = error||"";
            }

            // if password
            if(name === 'password'){
                const error = validate.password(value)
                dataError.errors[name] = error||"";
            }

        }
    })

    dataError.hasError = Object.values(dataError.errors).filter((error)=>error).length>0;
    return dataError;
}

const validate = {
    required: (value: string) => {
        if (!value) {
            return 'This field is required';
        }
    },
    email: (value: string) => {
        if (!value) {
            return 'This field is required';
        }
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(value)) {
            return 'Invalid email address';
        }
    },
    password: (value: string) => {
        if (!value) {
            return 'This field is required';
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

        const message = 'Password must be at between 5-16 characters long, contain at least one lowercase letter, one uppercase letter, and one number';
        if (!passwordRegex.test(value)) {
            return message
        }
    },
    phoneNumber: (value: string) => {
        if (!value) {
            return 'This field is required';
        }
        const phoneNumberRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!phoneNumberRegex.test(value)) {
            return 'Invalid phone number';
        }
    },
};