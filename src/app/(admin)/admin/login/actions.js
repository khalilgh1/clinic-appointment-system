'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

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
