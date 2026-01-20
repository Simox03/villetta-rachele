/**
 * @file components/admin/AdminLogin.tsx
 * @purpose Renders the login form for accessing the admin area.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface AdminLoginProps {
    onLogin: (success: boolean) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // NOTE: In a real application, this should be a secure API call.
        if (username === 'admin' && password === 'password') {
            setError('');
            onLogin(true);
        } else {
            setError('Credenziali non valide.');
            onLogin(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-6">Accesso Area Riservata</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Utente</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white text-slate-900"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white text-slate-900"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button type="submit" className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600">Accedi</button>
                    <Link to="/" className="text-sm text-teal-600 hover:underline mt-4 block text-center">Torna al sito</Link>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;