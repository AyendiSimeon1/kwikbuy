"use client";
import { gql, useMutation } from '@apollo//client';
import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setCredentials, setLoading, setError, clearError } from '../../../redux/userSlice';
import { useTypedSelector } from '../../../lib/typedSelector';
import { Check, X, AlertCircle } from 'lucide-react';
// import  withAuth from '@/hoc/withAuth';

interface User {
  email: string;
  username: string;
}

interface SignupResponse {
  signup: {
    token: string;
    user: User;
  };
}

interface SignupVariables {
  email: string;
  username: string;
  password: string;
}

interface FormData {
  email: string;
  username: string;
  password: string;
}

interface FormErrors {
  email?: string;
  username?: string;
  password?: string;
}

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'warning';
  onClose: () => void;
}

interface IconMap {
  [key: string]: JSX.Element;
}

interface ColorMap {
  [key: string]: string;
}

const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $username: String!, $password: String!) {
    signup(email: $email, username: $username, password: $password) {
      token
      user {
        email
        username
      }
    }
  }
`;

const NotificationToast: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        setTimeout(onClose, 300);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons: IconMap = {
    success: <Check className="w-5 h-5 text-white" />,
    error: <X className="w-5 h-5 text-white" />,
    warning: <AlertCircle className="w-5 h-5 text-white" />
  };

  const colors: ColorMap = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500'
  };

  return (
    <div className={`fixed top-4 right-4 flex items-center p-4 rounded-lg shadow-lg transition-all duration-300 ${colors[type]} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
      <div className="mr-3">{icons[type]}</div>
      <p className="text-white font-medium">{message}</p>
    </div>
  );
};

const SignupPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useTypedSelector((state) => state.auth);
  const [notification, setNotification] = useState<NotificationProps | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '',
    password: ''
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validateForm = (data: FormData): FormErrors => {
    const errors: FormErrors = {};
    if (data.username.length < 5) {
      errors.username = 'Username must be at least 5 characters';
    }
    if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = 'Invalid email format';
    }
    if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    return errors;
  };

  useEffect(() => {
    if (error) {
      setNotification({
        message: error,
        type: 'error',
        onClose: () => setNotification(null)
      });
    }
    return () => {
      dispatch(clearError());
    };
  }, [error, dispatch]);

  const [signup] = useMutation<SignupResponse, SignupVariables>(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      dispatch(setCredentials({
        user: data.signup.user,
        token: data.signup.token,
        login: 'string',
        errorMessage: '',
        errorCode: ''
      }));
      setNotification({
        message: 'Account created successfully!',
        type: 'success',
        onClose: () => setNotification(null)
      });
      router.push('/dashboard');
    },
    onError: (error) => {
      dispatch(setError(error.message));
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

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm(formData);
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      await signup({
        variables: {
          email: formData.email,
          username: formData.username,
          password: formData.password
        }
      });
    } catch (err) {
      if (err instanceof Error) {
        setNotification({
          message: err.message,
          type: 'error',
          onClose: () => setNotification(null)
        });
      }
    } finally {
      dispatch(setLoading(false));
    }
  }, [formData, signup, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
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

      {notification && (
        <NotificationToast
          message={notification.message}
          type={notification.type}
          onClose={notification.onClose}
        />
      )}
    </div>
  );
};

// export default withAuth(SignupForm, { requireAuth: true, redirectPath: '/dashboard' });

export default SignupPage;