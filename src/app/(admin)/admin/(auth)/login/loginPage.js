'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, HeartPulse, ArrowLeft } from 'lucide-react';
import { login } from './actions';
import { sendResetEmail } from './actions';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isReset, setIsReset] = useState(false); // to toggle between login and reset password views
    const [resetEmail, setResetEmail] = useState(''); // for reset form

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
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

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const result = await sendResetEmail(resetEmail);

            if (result.success) {
                setSuccess(result.message);
                setResetEmail('');
                // Optional: automatically redirect back to login after a delay
                setTimeout(() => {
                    setIsReset(false);
                }, 3000);
            } else {
                setError(result.message || 'Failed to send reset email.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Reset error:', err);
        } finally {
            setLoading(false);
        }
    };

    const toggleToReset = () => {
        setEmail('');
        setPassword('');
        setError('');
        setSuccess('');
        setIsReset(true);
    };

    const toggleToLogin = () => {
        setResetEmail('');
        setError('');
        setSuccess('');
        setIsReset(false);
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
                        {isReset ? 'Réinitialiser votre mot de passe' : 'Connectez-vous pour accéder à votre compte'}
                    </p>
                </div>

                {/* Login Form */}
                {!isReset && (
                    <div
                        className="p-8 rounded-lg shadow-md"
                        style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}
                    >
                        <form onSubmit={handleLoginSubmit} className="space-y-6">
                            {/* Error Message */}
                            {error && (
                                <div
                                    className="p-4 rounded-md text-sm font-medium"
                                    style={{ backgroundColor: '#FFE5E5', color: '#FB2C36', borderRadius: '8px' }}
                                >
                                    {error}
                                </div>
                            )}

                            {/* Success Message */}
                            {success && (
                                <div
                                    className="p-4 rounded-md text-sm font-medium"
                                    style={{ backgroundColor: '#E5F5E5', color: '#2EA02E', borderRadius: '8px' }}
                                >
                                    {success}
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
                                            <EyeOff size={15} />
                                        ) : (
                                            <Eye size={15} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Forgot Password Link */}
                            <div className="flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={toggleToReset}
                                    className="text-sm hover:underline"
                                    style={{ color: '#064045' }}
                                >
                                    Mot de passe oublié ?
                                </button>
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
                )}

                {/* Reset Password Form */}
                {isReset && (
                    <div
                        className="p-8 rounded-lg shadow-md"
                        style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}
                    >
                        <form onSubmit={handleResetSubmit} className="space-y-6">
                            {/* Error Message */}
                            {error && (
                                <div
                                    className="p-4 rounded-md text-sm font-medium"
                                    style={{ backgroundColor: '#FFE5E5', color: '#FB2C36', borderRadius: '8px' }}
                                >
                                    {error}
                                </div>
                            )}

                            {/* Success Message */}
                            {success && (
                                <div
                                    className="p-4 rounded-md text-sm font-medium"
                                    style={{ backgroundColor: '#E5F5E5', color: '#2EA02E', borderRadius: '8px' }}
                                >
                                    {success}
                                </div>
                            )}

                            {/* Email Field */}
                            <div>
                                <label
                                    htmlFor="reset-email"
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: '#064045' }}
                                >
                                    Adresse e-mail
                                </label>
                                <p className="text-sm mb-4" style={{ color: '#9BB3B5' }}>
                                    Entrez l'adresse e-mail associée à votre compte. Nous vous enverrons un lien pour réinitialiser votre mot de passe.
                                </p>
                                <div className="relative">
                                    <Mail size={15} className='absolute left-3 top-3 w-5 h-5' style={{ color: '#9BB3B5' }} />
                                    <input
                                        id="reset-email"
                                        type="email"
                                        placeholder="vous@exemple.com"
                                        value={resetEmail}
                                        onChange={(e) => setResetEmail(e.target.value)}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-all"
                                        style={{
                                            borderColor: '#E0E0E0',
                                            '--tw-ring-color': '#064045'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Reset Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-md font-semibold text-white transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-90"
                                style={{ backgroundColor: '#064045' }}
                            >
                                {loading ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation'}
                            </button>

                            {/* Back to Login Button */}
                            <button
                                type="button"
                                onClick={toggleToLogin}
                                className="w-full py-3 rounded-md font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                                style={{
                                    backgroundColor: '#F0F0F0',
                                    color: '#064045',
                                    border: '1px solid #E0E0E0'
                                }}
                            >
                                <ArrowLeft size={18} />
                                Retour à la connexion
                            </button>
                        </form>
                    </div>
                )}

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
