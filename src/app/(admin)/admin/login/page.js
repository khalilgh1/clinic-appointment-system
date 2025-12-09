'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, HeartPulse } from 'lucide-react';
import { login } from './actions';

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login(email, password);

            if (result.success) {
                router.push('/admin/overview');
            } else {
                setError(result.message || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F5F7F8' }}>
            <div className="w-full max-w-md">
                {/* HeartPulse Icon and Title */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: '#064045' }}
                        >
                            
                            <HeartPulse size={15} className="text-white w-8 h-8" />
                        </div>
                    </div>
                    <h1 className="text-xl font-semibold mb-2" style={{ color: '#064045' }}>
                        Tableau de bord de la clinique
                    </h1>
                    <p className="text-sm" style={{ color: '#9BB3B5' }}>
                        Connectez-vous pour accéder à votre compte
                    </p>
                </div>

                {/* Login Form */}
                <div
                    className="p-8 rounded-lg shadow-md"
                    style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Error Message */}
                        {error && (
                            <div
                                className="p-4 rounded-md text-sm font-medium"
                                style={{ backgroundColor: '#FFE5E5', color: '#FB2C36', borderRadius: '8px' }}
                            >
                                {error}
                            </div>
                        )}

                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium mb-2"
                                style={{ color: '#064045' }}
                            >
                                Adresse e-mail
                            </label>
                            <div className="relative">

                                <Mail size={15} className='absolute left-3 top-3 w-5 h-5' style={{ color: '#9BB3B5' }} />
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="vous@exemple.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-all"
                                    style={{
                                        borderColor: '#E0E0E0',
                                        '--tw-ring-color': '#064045'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium mb-2"
                                style={{ color: '#064045' }}
                            >
                                Mot de passe
                            </label>
                            <div className="relative">
                                <Lock size={15} className='absolute left-3 top-3 w-5 h-5' style={{ color: '#9BB3B5' }} />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Entrez votre mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-10 py-3 border rounded-md focus:outline-none focus:ring-2 transition-all"
                                    style={{
                                        borderColor: '#E0E0E0',
                                        '--tw-ring-color': '#064045'
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    {showPassword ? (
                                        //icon 
                                        <EyeOff size={15} />
                                    ) : (
                                        //icon for eye
                                        <Eye size={15} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded"
                                    style={{ accentColor: '#064045' }}
                                />
                                <span className="ml-2 text-sm" style={{ color: '#064045' }}>
                                    Se souvenir de moi
                                </span>
                            </label>
                            <a
                                href="#"
                                className="text-sm hover:underline"
                                style={{ color: '#064045' }}
                            >
                                Mot de passe oublié ?
                            </a>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-md font-semibold text-white transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-90"
                            style={{ backgroundColor: '#064045' }}
                        >
                            {loading ? 'Connexion en cours...' : 'Se connecter'}
                        </button>
                    </form>
                </div>

                {/* Footer Text */}
                <div className="text-center mt-6 text-sm" style={{ color: '#9BB3B5' }}>
                    <p>
                        Vous n'avez pas de compte ?{' '}
                        <a
                            href="#"
                            className="hover:underline font-medium"
                            style={{ color: '#064045' }}
                        >
                            Contacter l'administrateur
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
