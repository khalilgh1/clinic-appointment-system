'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function login(email, password) {
    const supabase = await createClient();

    try {
        // Attempt to sign in with email and password
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return {
                success: false,
                message: error.message || 'Invalid email or password',
            };
        }

        if (!data.user) {
            return {
                success: false,
                message: 'Login failed. Please try again.',
            };
        }

        // Optional: Check if user is an admin (if you have a role field in your users table)
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('role')
            .eq('id', data.user.id)
            .single();

        if (userError) {
            console.error('Error fetching user data:', userError);
            // Continue with login even if user data fetch fails
        }

        // Check if user is admin (optional - customize based on your schema)
        if (userData && userData.role !== 'admin') {
            await supabase.auth.signOut();
            return {
                success: false,
                message: 'Access denied. Admin account required.',
            };
        }

        revalidatePath('/admin/overview');

        return {
            success: true,
            message: 'Login successful',
            user: data.user,
        };
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            message: 'An error occurred during login. Please try again.',
        };
    }
}

export async function sendResetEmail(email) {
    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
        return {
            success: false,
            message: error.message || 'Failed to send reset email. Please try again.',
        };
    }

    return {
        success: true,
        message: 'Password reset email sent successfully. Please check your inbox.',
    };
}

export async function updatePassword(newPassword) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
    });
    if (error) {
        return {
            success: false,
            message: error.message || 'Failed to update password. Please try again.',
        };
    }
    return {
        success: true,
        message: 'Password updated successfully.',
        user: data.user,
    };
       
}

export async function logout() {
    const supabase = await createClient();

    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Logout error:', error);
            return {
                success: false,
                message: 'An error occurred during logout.',
            };
        }

        revalidatePath('/admin/login');

        redirect('/admin/login');

    } catch (error) {
        console.error('Logout error:', error);
        return {
            success: false,
            message: 'An error occurred during logout.',
        };
    }
}
