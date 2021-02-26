import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

const LoginView = (props) => {

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
    location: '',
    terms: true,
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
      setFormState(newFormData)
  }

  return (
    <form>
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

      <input 
        id='email'
        type='text'
        name='email'
        value={formState.email}
        placeholder='Email'
        onChange={inputChange}
        data-cy='email'
      />

      <input 
        id='password'
        type='password'
        name='password'
        value={formState.password}
        placeholder='Password'
        onChange={inputChange}
        data-cy='password'
      />

      <input 
        id='passwordConfirm'
        type='password'
        name='passwordConfirm'
        value={formState.passwordConfirm}
        placeholder='Please Confirm Password'
        onChange={inputChange}
        data-cy='passwordConfirm'
      
      />

      <input 
        id='location'
        type='text'
        name='location'
        value={formState.location}
        placeholder='Location'
        onChange={inputChange}
        data-cy='location'
      />

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
      </label>

      <button disabled={buttonDisabled} type='submit'>Submit</button>
      

    </form>
  );
};

export default LoginView;
