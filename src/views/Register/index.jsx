import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';


const RegisterView = (props) => {
  const history = useHistory()

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
    location: '',
    terms: '',
  })

  const [buttonDisabled, setButtonDisabled] = useState(true)

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
    location: '',
    terms: '',
  })

  const inputChange = (e) => {
    e.persist()
    console.log('The input has been changed', e.target.value)
      const newFormData = {
        ...formState, [e.target.name] : e.target.type === 'checkbox'
         ? e.target.checked : e.target.value
      }
      validateChange(e)
      setFormState(newFormData)
  }

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.name === 'terms' ? e.target.checked : e.target.value)
      .then((valid) => {
        setErrors({
          ...errors, [e.target.name] : '',
        })
      })
      .catch((error) => {
        console.log(error, "Something is wrong")

        setErrors({
          ...errors, [e.target.name] : error.errors[0]
        })
      })
  }

  const submitForm = async (e) => {
    e.preventDefault();
    console.log('Form has been Submitted!')
    await props.register({
      email: formState.email,
      name: formState.name,
      username: formState.username,
      password: formState.password,
      location: formState.location
    })
    history.pushState('/home')
  }

  const formSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Email must be valid').required('Email is required'),
    username: yup.string().required('Please pick a username'),
    password: yup.string().min(8).max(20),
    passwordConfirm: yup.string().when('password', {
      is: (val) => val && val.length > 0,
      then: yup.string().oneOf([yup.ref('password')], 'Password must be the same').required(),
    }),
    location: yup.string().required('Location is required'),
    terms: yup.boolean().oneOf([true], 'Please agree to Terms and Conditions to continue')
  })

  useEffect(() => {
    formSchema.isValid(formState).then((isValid) => {
      setButtonDisabled(!isValid)
    })
  }, [formState, formSchema])

  if (props.loading) {
    console.log('loading');
    return <span className='loading'>Please Standby...</span>
  }

  return (
    <form onSubmit={submitForm}>
      <h1>New Seller Registration!</h1>
      <p>Welcome! Please fill out the following information to continue.</p>

      <input 
        id='name'
        type='text'
        name='name'
        value={formState.name}
        placeholder='Name'
        onChange={inputChange}
        data-cy='name'
      />

        {errors.name.length > 0 ? <p className='error'>{errors.name}</p> : null}

      <input 
        id='username'
        type='text'
        name='username'
        value={formState.userName}
        placeholder='Username'
        onChange={inputChange}
        data-cy='username'
      />

        {errors.username.length > 0 ? <p className='error'>{errors.username}</p> : null}

      <input 
        id='email'
        type='text'
        name='email'
        value={formState.email}
        placeholder='Email'
        onChange={inputChange}
        data-cy='email'
      />

        {errors.email.length > 0 ? <p className='error'>{errors.email}</p> : null}

      <input 
        id='password'
        type='password'
        name='password'
        value={formState.password}
        placeholder='Password'
        onChange={inputChange}
        data-cy='password'
      />

        {errors.password.length > 0 ? <p className='error'>{errors.password}</p> : null}

      <input 
        id='passwordConfirm'
        type='password'
        name='passwordConfirm'
        value={formState.passwordConfirm}
        placeholder='Please Confirm Password'
        onChange={inputChange}
        data-cy='passwordConfirm'
      
      />

        {errors.passwordConfirm.length > 0 ? <p className='error'>{errors.passwordConfirm}</p> : null}

      <input 
        id='location'
        type='text'
        name='location'
        value={formState.location}
        placeholder='Location'
        onChange={inputChange}
        data-cy='location'
      />

        {errors.location.length > 0 ? <p className='error'>{errors.location}</p> : null}

      <label htmlFor='terms' className='terms'>
        <input
          id='terms' 
          type='checkbox'
          name='terms'
          checked={formState.terms}
          onChange={inputChange}
          data-cy='terms'
        />
        Terms and Conditions
        {errors.terms.length > 0 ? <p className='error'>{errors.terms}</p> : null}

      </label>

      <button disabled={buttonDisabled} type='submit'>Submit</button>
      

    </form>
  );
};

export default RegisterView;
