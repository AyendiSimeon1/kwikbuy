"use client";
import { useMutation } from '@apollo//client';
import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setCredentials, setLoading, setError, clearError } from '../../../redux/userSlice';
import { useTypedSelector } from '../../../lib/typedSelector';
import { Check, X, AlertCircle } from 'lucide-react';
import SIGNUP_MUTATION  from '@/mutations/auth';
import { FormErrors, SignupFormData } from '@/components/types/auth';
// import  withAuth from '@/hoc/withAuth';


interface Response extends SignupFormData {
  token: string;
  user: { email: string;
  username: string;
  
}
}

const SignupPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [messages, setMessages] = useState<string>('');
  const { loading, error } = useTypedSelector((state) => state.auth);
  
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    username: '',
    password: ''
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});




  const [signup] = useMutation(SIGNUP_MUTATION, {
    onError: (error) => {
      console.log('Mutation Error', error);
      setError(error.message);
    },
    onCompleted: (data) => {
      console.log('Login succesful:', data.signup);
      dispatch(setCredentials(data.signup));
    }
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setFormErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name as keyof FormErrors];
      return newErrors;
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      const { data }  = await signup({
        variables: {
          email: formData.email,
          username: formData.username,
          password: formData.password
        }
      });
      const token = data.token;
      if (token) {
        console.log('There was an error');
      } else {
        console.log('Mutation result:', data);
        const token = data.token;
        const email = data.signup.user.email;
        const username = data.signup.user.username;
        const response= {
          token,
          user: { email, username },
          password: '',
         
        };
        dispatch(setCredentials(response));
      // dispatch(setCredentials(data.signup));
      setMessages('Your account have been created successfully');
       router.push('/dashboard');

      }
      
    } catch (err) {
      console.log("Error executing mutation:" , error)
      setMessages('There was an error');
      } finally {
      dispatch(setLoading(false));
    } 
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <p className='font-sans text-xl font-semibold text-gray-500'>{messages}</p>
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Create your account
        </h2>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent`}
                placeholder="Email"
                required
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${formErrors.username ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent`}
                placeholder="Username"
                required
              />
              {formErrors.username && (
                <p className="text-red-500 text-xs mt-1">{formErrors.username}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent`}
                placeholder="Password"
                required
              />
              {formErrors.password && (
                <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 ${loading ? 'bg-gray-400' : 'bg-green-500'} text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200`}
              
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
        </form>

        <div className="mt-4">
          <select className="text-gray-600 bg-transparent focus:outline-none">
            <option>English (United States)</option>
          </select>
        </div>
      </div>

    
    </div>
  );
}

// export default withAuth(SignupForm, { requireAuth: true, redirectPath: '/dashboard' });

export default SignupPage;