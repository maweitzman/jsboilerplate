import * as Yup from 'yup';

const PumpValidator = Yup.object().shape({
    name: Yup.string().required('Field is required!')
});

export default PumpValidator;