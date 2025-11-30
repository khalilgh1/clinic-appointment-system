import React from 'react';

export const metadata = {
	title: 'Admin',
};

export default function AdminPage() {
	return (
		<main className="min-h-screen p-6 bg-white">
			<h1 className="text-2xl font-semibold text-gray-900">Admin dashboard</h1>
			<p className="mt-3 text-sm text-gray-600">Select a section from the sidebar to manage the clinic.</p>
		</main>
	);
}
