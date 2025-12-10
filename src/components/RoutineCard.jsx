import React from 'react';
import { Play, Clock, Zap } from 'lucide-react';

export default function RoutineCard({ routine, onStart }) {
    // Determine gradient based on routine type (using legacy id or title logic for demo)
    const isRelief = routine.id.includes('desk');
    const isSleep = routine.id.includes('sleep');

    const bgStyle = isRelief
        ? 'linear-gradient(135deg, hsl(var(--color-secondary-light)), hsl(var(--color-surface)))'
        : isSleep
            ? 'linear-gradient(135deg, hsl(260 30% 94%), hsl(var(--color-surface)))'
            : 'linear-gradient(135deg, hsl(var(--color-primary-light)), hsl(var(--color-surface)))';

    const iconColor = isRelief
        ? 'hsl(var(--color-secondary))'
        : isSleep
            ? 'hsl(260 40% 60%)'
            : 'hsl(var(--color-primary))';

    return (
        <div className="animate-enter" style={{
            marginBottom: '1rem',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            background: bgStyle,
            position: 'relative',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            border: '1px solid rgba(0,0,0,0.03)'
        }} onClick={onStart}>

            {/* Top Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <div style={{
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: iconColor,
                        fontWeight: '700',
                        marginBottom: '0.25rem'
                    }}>
                        Fusion Workout
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{routine.title}</h3>
                </div>

                <div style={{
                    background: 'white',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-sm)'
                }}>
                    <Play size={18} fill={iconColor} color={iconColor} style={{ marginLeft: '2px' }} />
                </div>
            </div>

            {/* Meta Row */}
            <div style={{ display: 'flex', gap: '1rem', opacity: 0.8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.9rem', color: 'hsl(var(--text-muted))' }}>
                    <Clock size={16} />
                    <span>{Math.floor(routine.duration / 60)} min</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.9rem', color: 'hsl(var(--text-muted))' }}>
                    <Zap size={16} />
                    <span>Intensity {isSleep ? 'Low' : 'Med'}</span>
                </div>
            </div>
        </div>
    );
}
