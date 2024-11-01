'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { LoginVariables, LoginFormData, LoginFormErrors, LoginResponse, FormErrors  } from '@/components/types/auth';
import { gql, useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useTypedSelector } from '@/lib/typedSelector';
import { setCredentials, setLoading, clearError, setError } from '@/redux/userSlice';
import { ClipLoader } from 'react-spinners'

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      
    }
  }
  `;

const validateForm = (formData: LoginFormData) : LoginFormErrors => {
  const errors: LoginFormErrors = {
   
  }

  if(!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.email = 'Invalid email address'
  }

  if(formData.password.length < 5 ){
    errors.password = 'Password should not be less than 6 characters'
  }

  return errors;

}
export default function loginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useTypedSelector((state) => state.auth);
  const  state  = useSelector((state) => state );
  console.log(state);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [formError, setFormError] = useState<LoginFormErrors>({});

  useEffect(() => {
    return () => {
      dispatch(clearError());
    }
  }, [dispatch]);

  const [login] = useMutation<LoginResponse, LoginVariables>(LOGIN_MUTATION, {
    onCompleted: (data) => {
      dispatch(setCredentials({
        user: data.login.user,
        token: data.login.token,
        login: undefined
      }));
      router.push('/dashboard');
    },
    onError: (error) => {
      if(error.graphQLErrors) {
        error.graphQLErrors.forEach((( { message, locations, path }) => {
          console.error(`[GraphQL error]: Message: ${message}, location: ${locations}, Path: ${path}`);
          dispatch(setError(message));
        }))
      }

      console.error(error);
    }
  });
                                            

  const handleInputChange = useCallback( async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }  = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    setFormError(prev => {
      const newErrors = { ...prev };
      // delete newErrors[name as keyof FormErrors];
      return newErrors;
    });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
   
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0 ) {
      setFormError(errors);
      return;
    }
    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      await login({
        variables: {
          email: formData.email,
          password: formData.password,
        }
      })
    } catch(err) {
      console.error('Signup Error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
        <div className="flex justify-start mb-6">
          <svg className="w-8 h-8" viewBox="0 0 24 24">
            <path
              fill="#34D399"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            />
          </svg>
        </div>

      <h1 className="text-2xl font-normal text-gray-900 mb-8">
          Login
        </h1>

      
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label 
                htmlFor="Email"
                className="block text-sm text-gray-700 mb-1"
              >
                
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                placeholder="Email"
                required
              />
            </div>

            <div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                placeholder="Passowrd"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            > 
            { loading ? (
              <>
              <ClipLoader size={20} color="#fffff" loading={loading} />
              </>
            ): (
              'Login'
            )}
              
            </button>
          </div>
        </form>

        <div className="mt-8 flex justify-between text-sm">
          <select className="text-gray-600 bg-transparent focus:outline-none">
            <option>English (United States)</option>
          </select>
          <div className="space-x-4">
            <Link href="/help" className="text-gray-600 hover:text-green-600">
              Help
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-green-600">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-green-600">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}