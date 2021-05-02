import { useState, ChangeEventHandler } from 'react';


interface UseForm {
    (initialState: object):[value:object, handleInputChange:ChangeEventHandler]
}

export const useForm:UseForm = ( initialState: object = {} ) => {
    const [values, setValues] = useState(initialState);

    const handleInputChange = ({ target }:any) => {
        setValues({
            ...values,
            [ target.name ]: target.value
        });
    }
    return [ values, handleInputChange];
}
