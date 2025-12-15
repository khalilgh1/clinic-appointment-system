'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, ArrowLeft, HeartPulse } from 'lucide-react';
import { updatePassword } from '../login/actions';

export default function ResetPasswordPage() {
    const router = useRouter();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (newPassword.length < 8) {
            setError('Le mot de passe doit comporter au moins 8 caractères.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        setLoading(true);

        try {
            const result = await updatePassword(newPassword);

            if (result.success) {
                setSuccess('Votre mot de passe a été mis à jour.');
                setNewPassword('');
                setConfirmPassword('');
                setTimeout(() => {
                    router.push('/admin/login');
                }, 1600);
            } else {
                setError(result.message || 'Impossible de mettre à jour votre mot de passe.');
            }
        } catch (err) {
            console.error('Reset password error:', err);
            setError('Une erreur est survenue. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F5F7F8' }}>
            <div className="w-full max-w-md px-6">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: '#064045' }}
                        >
                            <HeartPulse size={18} className="text-white" />
                        </div>
                    </div>
                    <h1 className="text-xl font-semibold mb-2" style={{ color: '#064045' }}>
                        Réinitialisation du mot de passe
                    </h1>
                    <p className="text-sm" style={{ color: '#9BB3B5' }}>
                        Choisissez un nouveau mot de passe sécurisé pour accéder à votre tableau de bord.
                    </p>
                </div>

                <div className="p-8 rounded-lg shadow-md bg-white">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div
                                className="p-4 rounded-md text-sm font-medium"
                                style={{ backgroundColor: '#FFE5E5', color: '#FB2C36' }}
                            >
                                {error}
                            </div>
                        )}

                        {success && (
                            <div
                                className="p-4 rounded-md text-sm font-medium"
                                style={{ backgroundColor: '#E5F5E5', color: '#2EA02E' }}
                            >
                                {success}
                            </div>
                        )}

                        <div>
                            <label
                                htmlFor="new-password"
                                className="block text-sm font-medium mb-2"
                                style={{ color: '#064045' }}
                            >
                                Nouveau mot de passe
                            </label>
                            <div className="relative">
                                <Lock size={15} className="absolute left-3 top-3" style={{ color: '#9BB3B5' }} />
                                <input
                                    id="new-password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Entrez votre nouveau mot de passe"
                                    value={newPassword}
                                    onChange={(event) => setNewPassword(event.target.value)}
                                    required
                                    className="w-full pl-10 pr-10 py-3 border rounded-md focus:outline-none focus:ring-2 transition-all"
                                    style={{
                                        borderColor: '#E0E0E0',
                                        '--tw-ring-color': '#064045',
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <p className="text-xs mt-1" style={{ color: '#9BB3B5' }}>
                                Minimum 8 caractères, mélangez chiffres et lettres pour plus de sécurité.
                            </p>
                        </div>

                        <div>
                            <label
                                htmlFor="confirm-password"
                                className="block text-sm font-medium mb-2"
                                style={{ color: '#064045' }}
                            >
                                Confirmer le mot de passe
                            </label>
                            <div className="relative">
                                <Lock size={15} className="absolute left-3 top-3" style={{ color: '#9BB3B5' }} />
                                <input
                                    id="confirm-password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Confirmez le mot de passe"
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    required
                                    className="w-full pl-10 pr-10 py-3 border rounded-md focus:outline-none focus:ring-2 transition-all"
                                    style={{
                                        borderColor: '#E0E0E0',
                                        '--tw-ring-color': '#064045',
                                    }}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-md font-semibold text-white transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-90"
                            style={{ backgroundColor: '#064045' }}
                        >
                            {loading ? 'Mise à jour en cours...' : 'Mettre à jour le mot de passe'}
                        </button>

                        <button
                            type="button"
                            onClick={() => router.push('/admin/login')}
                            className="w-full py-3 rounded-md font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                            style={{
                                backgroundColor: '#F0F0F0',
                                color: '#064045',
                                border: '1px solid #E0E0E0',
                            }}
                        >
                            <ArrowLeft size={16} />
                            Retour à la connexion
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}