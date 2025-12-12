'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Lock, HeartPulse } from 'lucide-react';
import { updatePassword } from '../login/actions';

export default function ConfirmPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (!password || !confirmPassword) {
            setError('Veuillez remplir tous les champs');
            return;
        }

        if (password.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères');
            return;
        }

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        setLoading(true);

        try {
            const result = await updatePassword(password);

            if (result.success) {
                setSuccess(result.message);
                setPassword('');
                setConfirmPassword('');
                // Redirect to login page after 2 seconds
                setTimeout(() => {
                    router.push('/admin/login');
                }, 2000);
            } else {
                setError(result.message || 'Erreur lors de la mise à jour du mot de passe');
            }
        } catch (err) {
            setError('Une erreur est survenue. Veuillez réessayer.');
            console.error('Password update error:', err);
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
                        Réinitialiser le mot de passe
                    </h1>
                    <p className="text-sm" style={{ color: '#9BB3B5' }}>
                        Veuillez entrer votre nouveau mot de passe
                    </p>
                </div>

                {/* Reset Password Form */}
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

                        {/* Success Message */}
                        {success && (
                            <div
                                className="p-4 rounded-md text-sm font-medium"
                                style={{ backgroundColor: '#E5F5E5', color: '#2EA02E', borderRadius: '8px' }}
                            >
                                {success}
                            </div>
                        )}

                        {/* New Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium mb-2"
                                style={{ color: '#064045' }}
                            >
                                Nouveau mot de passe
                            </label>
                            <div className="relative">
                                <Lock size={15} className='absolute left-3 top-3 w-5 h-5' style={{ color: '#9BB3B5' }} />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Entrez un nouveau mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={8}
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
                            <p className="text-xs mt-1" style={{ color: '#9BB3B5' }}>
                                Le mot de passe doit contenir au moins 8 caractères
                            </p>
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium mb-2"
                                style={{ color: '#064045' }}
                            >
                                Confirmer le mot de passe
                            </label>
                            <div className="relative">
                                <Lock size={15} className='absolute left-3 top-3 w-5 h-5' style={{ color: '#9BB3B5' }} />
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Confirmez votre nouveau mot de passe"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    minLength={8}
                                    className="w-full pl-10 pr-10 py-3 border rounded-md focus:outline-none focus:ring-2 transition-all"
                                    style={{
                                        borderColor: '#E0E0E0',
                                        '--tw-ring-color': '#064045'
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={15} />
                                    ) : (
                                        <Eye size={15} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-md font-semibold text-white transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-90"
                            style={{ backgroundColor: '#064045' }}
                        >
                            {loading ? 'Mise à jour en cours...' : 'Réinitialiser le mot de passe'}
                        </button>
                    </form>

                    {/* Information Box */}
                    <div
                        className="mt-6 p-4 rounded-md text-sm"
                        style={{ backgroundColor: '#F0F0F0', color: '#064045' }}
                    >
                        <p className="font-medium mb-2">Conseils de sécurité :</p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                            <li>Utilisez un mot de passe unique et fort</li>
                            <li>Mélangez lettres, chiffres et caractères spéciaux</li>
                            <li>N'utilisez pas vos informations personnelles</li>
                        </ul>
                    </div>
                </div>

                {/* Footer Text */}
                <div className="text-center mt-6 text-sm" style={{ color: '#9BB3B5' }}>
                    <p>
                        Vous rencontrez des problèmes ?{' '}
                        <a
                            href="/admin/login"
                            className="hover:underline font-medium"
                            style={{ color: '#064045' }}
                        >
                            Retour à la connexion
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
