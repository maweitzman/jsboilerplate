import * as Yup from 'yup';

const UserValidator = Yup.object().shape({
    firstName: Yup.string().required('Field is required!'),
    lastName: Yup.string().required('Field is required!'),
    email: Yup.string().email('Email must be valid!').required('Field is required!'),
    username: Yup.string().required('Field is required!'),
    password: Yup.string().required('Field is required!')
});

export default UserValidator;