import React from 'react';
import { useUser } from '../context/UserContext';
import { getDailyRoutines } from '../data/workouts';
import RoutineCard from '../components/RoutineCard';
import { Flame, Wind, Settings } from 'lucide-react';

export default function HomeScreen({ onNavigate }) {
    const { streak } = useUser();
    const routines = getDailyRoutines();

    return (
        <div style={{ padding: '2rem 1.5rem', paddingBottom: '6rem' }}>

            {/* Header - Transparent & Clean */}
            <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <p style={{
                        color: 'hsl(var(--text-muted))',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '0.25rem'
                    }}>
                        TUESDAY, DEC 10
                    </p>
                    <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em' }}>Hello, Rocky</h1>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* Streak Pill */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        background: 'white',
                        padding: '0.4rem 0.8rem',
                        borderRadius: 'var(--radius-full)',
                        boxShadow: 'var(--shadow-sm)',
                        border: '1px solid rgba(0,0,0,0.05)'
                    }}>
                        <Flame size={18} color="#FF9F43" fill="#FF9F43" />
                        <span style={{ fontWeight: '700', fontSize: '0.95rem', color: 'hsl(var(--text-main))' }}>{streak}</span>
                    </div>

                    {/* Settings */}
                    <button onClick={() => onNavigate('settings')} style={{
                        background: 'white',
                        width: '36px', height: '36px',
                        borderRadius: '50%',
                        boxShadow: 'var(--shadow-sm)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '1px solid rgba(0,0,0,0.05)'
                    }}>
                        <Settings size={20} color="hsl(var(--text-muted))" />
                    </button>
                </div>
            </header>

            {/* Main Section */}
            <section style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                    <h2 style={{ fontSize: '1.25rem' }}>Today's Fusion</h2>
                    <span style={{ color: 'hsl(var(--color-primary))', fontSize: '0.9rem', fontWeight: '600' }}>View All</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {routines.map(routine => (
                        <RoutineCard
                            key={routine.id}
                            routine={routine}
                            onStart={() => onNavigate('workout', routine)}
                        />
                    ))}
                </div>
            </section>

            {/* Quick Tools */}
            <section>
                <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Mental Fitness</h2>
                <div className="card"
                    onClick={() => onNavigate('breathing')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.25rem',
                        cursor: 'pointer',
                        border: '1px solid rgba(0,0,0,0.03)'
                    }}>
                    <div style={{
                        background: 'linear-gradient(135deg, hsl(var(--color-secondary)), hsl(215 40% 40%))',
                        width: '48px',
                        height: '48px',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 10px rgba(50, 80, 150, 0.2)'
                    }}>
                        <Wind size={24} color="white" />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Check-in Breath</h3>
                        <p style={{ fontSize: '0.9rem', color: 'hsl(var(--text-muted))' }}>60s Reset • Stress Relief</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
