import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { X, Crown, Trash2, User, Bell, Volume2, Moon, ChevronRight } from 'lucide-react';

export default function SettingsScreen({ onExit }) {
    const { isPremium, streak, name, setName, preferences, updatePreference } = useUser();

    const handleReset = () => {
        if (confirm('Are you sure you want to reset your streak and history?')) {
            localStorage.clear();
            window.location.reload();
        }
    };

    const Toggle = ({ value, onToggle }) => (
        <div onClick={onToggle} style={{
            width: '50px', height: '28px',
            background: value ? 'hsl(var(--color-primary))' : 'hsl(var(--text-muted))',
            borderRadius: '99px',
            position: 'relative',
            cursor: 'pointer',
            transition: 'background 0.3s'
        }}>
            <div style={{
                width: '24px', height: '24px',
                background: 'white',
                borderRadius: '50%',
                position: 'absolute',
                top: '2px',
                left: value ? '24px' : '2px',
                transition: 'left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }} />
        </div>
    );

    return (
        <div className="animate-enter" style={{ height: '100vh', background: 'hsl(var(--color-bg))', display: 'flex', flexDirection: 'column' }}>

            {/* Header */}
            <div style={{ padding: '2rem', background: 'hsl(var(--color-surface))', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.5rem' }}>Settings</h2>
                    <button onClick={onExit} style={{ background: 'hsl(var(--color-bg))', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={20} /></button>
                </div>
            </div>

            <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>

                {/* Profile Section */}
                <section style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1rem', color: 'hsl(var(--text-muted))', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Profile</h3>
                    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
                        <div style={{ width: '48px', height: '48px', background: 'hsl(var(--color-secondary-light))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <User color="hsl(var(--color-secondary))" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))' }}>Display Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{
                                    display: 'block', width: '100%',
                                    border: 'none', background: 'transparent',
                                    fontSize: '1.1rem', fontWeight: '600', color: 'hsl(var(--text-main))',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>
                </section>

                {/* Preferences */}
                <section style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1rem', color: 'hsl(var(--text-muted))', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Preferences</h3>
                    <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                        <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <Bell size={20} color="hsl(var(--text-muted))" />
                                <span>Notifications</span>
                            </div>
                            <Toggle value={preferences.notifications} onToggle={() => updatePreference('notifications', !preferences.notifications)} />
                        </div>
                        <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <Volume2 size={20} color="hsl(var(--text-muted))" />
                                <span>Sound Effects</span>
                            </div>
                            <Toggle value={preferences.sounds} onToggle={() => updatePreference('sounds', !preferences.sounds)} />
                        </div>
                        <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <Moon size={20} color="hsl(var(--text-muted))" />
                                <span>Dark Mode</span>
                            </div>
                            <span style={{ fontSize: '0.9rem', color: 'hsl(var(--text-muted))' }}>System</span>
                        </div>
                    </div>
                </section>

                {/* Premium Banner */}
                <section style={{ marginBottom: '2rem' }}>
                    <div className="card" style={{ background: 'linear-gradient(135deg, hsl(35 80% 60%), hsl(35 60% 50%))', color: 'white', border: 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <Crown size={20} fill="white" />
                            <span style={{ fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem' }}>Premium</span>
                        </div>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Unlock Full Potential</h3>
                        <p style={{ opacity: 0.9, fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.4' }}>
                            Get personalized adaptive workouts, advanced analytics, and 100+ fusion routines.
                        </p>
                        <button style={{
                            background: 'white', color: 'hsl(35 80% 40%)',
                            width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-full)',
                            fontWeight: '700', fontSize: '1rem'
                        }}>
                            Start 7-Day Free Trial
                        </button>
                    </div>
                </section>

                {/* Data */}
                <section>
                    <h3 style={{ fontSize: '1rem', color: 'hsl(var(--text-muted))', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Data & Storage</h3>
                    <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                        <div onClick={() => onExit('history')} style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <ChevronRight size={20} color="hsl(var(--text-muted))" />
                                <span>View Workout History</span>
                            </div>
                        </div>
                        <div onClick={handleReset} style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'hsl(0 70% 60%)', cursor: 'pointer' }}>
                            <Trash2 size={20} />
                            <span>Reset All Progress</span>
                        </div>
                    </div>
                    <p style={{ textAlign: 'center', marginTop: '2rem', color: 'hsl(var(--text-muted))', fontSize: '0.8rem' }}>
                        Mindful Reps v1.2.0 • Build 2024
                    </p>
                </section>
            </div>
        </div>
    );
}
