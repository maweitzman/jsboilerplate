import * as Yup from 'yup';

const AuthValidator = Yup.object().shape({
    username: Yup.string().required('Field is required!'),
    password: Yup.string().required('Field is required!')
});

export default AuthValidator;