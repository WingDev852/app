import React from 'react';
import { useUser } from '../context/UserContext';
import { ChevronLeft, Calendar, BarChart2 } from 'lucide-react';
import { ROUTINES } from '../data/workouts';

export default function HistoryScreen({ onBack }) {
    const { history } = useUser();

    // Reverse history to show newest first
    const reversedHistory = [...history].reverse();

    const getRoutineTitle = (id) => {
        const r = ROUTINES.find(r => r.id === id);
        return r ? r.title : 'Workout';
    };

    const getMoodIcon = (mood) => {
        switch (mood) {
            case 5: return '🤩'; // Amazing
            case 4: return '🙂'; // Good
            case 3: return '😐'; // Okay
            case 2: return '😫'; // Tired
            case 1: return '😤'; // Stressed
            default: return '';
        }
    };

    return (
        <div className="animate-enter" style={{ height: '100vh', background: 'hsl(var(--color-bg))', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ padding: '2rem', background: 'hsl(var(--color-surface))', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button onClick={onBack} style={{ background: 'hsl(var(--color-bg))', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ChevronLeft size={20} />
                    </button>
                    <h2 style={{ fontSize: '1.5rem' }}>History</h2>
                </div>
            </div>

            <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>

                {history.length === 0 ? (
                    <div style={{ textAlign: 'center', marginTop: '4rem', opacity: 0.5 }}>
                        <Calendar size={48} style={{ marginBottom: '1rem' }} />
                        <p>No workouts yet.</p>
                        <p style={{ fontSize: '0.9rem' }}>Complete a fusion routine to start tracking.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {reversedHistory.map((entry, index) => (
                            <div key={index} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem' }}>{getRoutineTitle(entry.routineId)}</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'hsl(var(--text-muted))' }}>{entry.date}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    {entry.mood && <div style={{ fontSize: '1.5rem' }}>{getMoodIcon(entry.mood)}</div>}
                                    {/* <div style={{ fontSize: '0.8rem', color: 'hsl(var(--color-primary))', fontWeight: 'bold' }}>COMPLETED</div> */}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}
