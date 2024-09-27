import { useState } from "react";

export const useForm = ( initForm ) => {

    const [isDisabled, setIsDisabled] = useState(false);
    const [form, setForm] = useState( initForm );

    const handleChange = ( { target } ) => {
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const resetForm = () => {
        setForm(initForm);
    }

    const disabledActions = () => {
        setIsDisabled( true );
        return true;
      };
    
      const enableActions = () => {
        resetForm();
        setIsDisabled( false );
      };    

    return {
        handleChange,
        resetForm,
        setForm,
        form,

        isDisabled,
        setIsDisabled,
        enableActions,
        disabledActions,
    };
};