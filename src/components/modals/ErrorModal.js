"use client"

import React from 'react'

export default function ErrorModal({ title = 'Error', message = '', onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/40" onClick={onClose} />
            <div className="bg-white rounded-2xl p-6 z-10 max-w-lg w-full shadow-lg">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-sm text-gray-700 mb-4">{message}</p>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-primary text-white rounded-lg"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}
