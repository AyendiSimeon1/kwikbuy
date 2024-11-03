"use client";
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { FormErrors } from '@/components/types/auth';
import Link from 'next/link';
import { ClipLoader } from 'react-spinners';



const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      error
      errorMessage
      errorCode
    }
  }
`;

const LoginComponent: React.FC = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [formError, setFormError] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
   
    const [mutateLogin] = useMutation(LOGIN_MUTATION, {
      
        onError: (error) => {
            console.log('Mutation error:', error);
            setError(error.message);
        },
        onCompleted: (data) => {
            console.log('Login successful:', data);
            setFormError(data);
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const { data } = await mutateLogin({ variables: { email: formData.email, password: formData.password } });
            console.log('Mutation result:', data);
        } catch (error) {
            console.error('Error executing mutation:', error);
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-500 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white rounded-xl shadow-sm p-8">
                <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Login</h1>
                {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
                <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
                    <div className="space-y-4">
                        <div>
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
                            {formError.email && <div className="text-red-500 text-sm mt-1">{formError.email}</div>}
                        </div>
                        <div>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                                placeholder="Password"
                                required
                            />
                            {formError.password && <div className="text-red-500 text-sm mt-1">{formError.password}</div>}
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">
                            {loading ? <ClipLoader size={20} color="#ffffff" loading={loading} /> : 'Login'}
                        </button>
                    </div>
                </form>
                <div className="mt-8 flex justify-between text-sm">
                    <select className="text-gray-600 bg-transparent focus:outline-none">
                        <option>English (United States)</option>
                    </select>
                    <div className="space-x-4">
                        <Link href="/help" className="text-gray-600 hover:text-green-600">Help</Link>
                        <Link href="/privacy" className="text-gray-600 hover:text-green-600">Privacy</Link>
                        <Link href="/terms" className="text-gray-600 hover:text-green-600">Terms</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
