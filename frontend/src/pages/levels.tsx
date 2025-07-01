import React, { useEffect, useState } from 'react';
import LevelCard from '../components/LevelCard';
import { fetchLevels } from '../utils/api';
import { Level } from '../types';

const LevelsPage: React.FC = () => {
    const [levels, setLevels] = useState<Level[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [unlockedLevels, setUnlockedLevels] = useState<Set<number>>(new Set());

    useEffect(() => {
        const getLevels = async () => {
            try {
                setLoading(true);
                const data = await fetchLevels();
                setLevels(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error desconocido');
            } finally {
                setLoading(false);
            }
        };

        getLevels();
    }, []);

    const handleUnlockLevel = (levelId: number) => {
        setUnlockedLevels(prev => new Set([...prev, levelId]));
        // Aquí podrías hacer una llamada a la API para guardar el progreso
        console.log(`Nivel ${levelId} desbloqueado!`);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Cargando niveles...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <h2>Error al cargar los niveles</h2>
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>
                    Intentar de nuevo
                </button>
            </div>
        );
    }

    return (
        <div className="levels-page">
            <header className="page-header">
                <h1>🎯 Niveles Desbloqueables</h1>
                <p>Completa cada nivel para desbloquear el siguiente</p>
            </header>
            
            <div className="levels-container">
                {levels.map((level, index) => (
                    <LevelCard 
                        key={level.id} 
                        level={level}
                        onUnlock={handleUnlockLevel}
                        isUnlocked={unlockedLevels.has(level.id)}
                    />
                ))}
            </div>
            
            {levels.length === 0 && (
                <div className="empty-state">
                    <p>No hay niveles disponibles en este momento.</p>
                </div>
            )}
        </div>
    );
};

export default LevelsPage;