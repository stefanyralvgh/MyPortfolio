import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProtectedRoute from '../../components/admin/ProtectedRoute';
import { adminProfile } from '../../utils/adminApi';

interface QuickStat {
  label: string;
  value: string;
}

interface RecruiterData {
  quick_stats?: {
    [key: string]: string;
  };
}

const AdminRecruiter: React.FC = () => {
  const router = useRouter();
  const [quickStats, setQuickStats] = useState<QuickStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await adminProfile.get();
      
      // Convertir el objeto quick_stats a array de stats
      const statsArray: QuickStat[] = data.quick_stats 
        ? Object.entries(data.quick_stats).map(([label, value]) => ({
            label,
            value: value as string
          }))
        : [];
      
      setQuickStats(statsArray);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Convertir array de stats de vuelta a objeto
      const quick_stats = quickStats.reduce((acc, stat) => {
        if (stat.label.trim()) {
          acc[stat.label] = stat.value;
        }
        return acc;
      }, {} as { [key: string]: string });

      await adminProfile.update({ quick_stats });
      alert('Quick stats actualizadas exitosamente');
      fetchProfile();
    } catch (error: any) {
      alert(error.response?.data?.errors?.join(', ') || 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  const handleStatChange = (index: number, field: 'label' | 'value', newValue: string) => {
    const updated = [...quickStats];
    updated[index][field] = newValue;
    setQuickStats(updated);
  };

  const addStat = () => {
    setQuickStats([...quickStats, { label: '', value: '' }]);
  };

  const removeStat = (index: number) => {
    setQuickStats(quickStats.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #181824 0%, #2d193c 100%)',
          color: '#f3b1e6',
        }}>
          Cargando...
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #181824 0%, #2d193c 100%)',
        padding: '2rem',
        fontFamily: 'Courier New, Monaco, Menlo, monospace',
        color: '#f3b1e6',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
          }}>
            <h1 style={{ margin: 0, fontSize: '2rem' }}>📊 Recruiter Quick Stats</h1>
            <button
              onClick={() => router.push('/admin/dashboard')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(243, 177, 230, 0.3)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#f3b1e6',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              ← Dashboard
            </button>
          </div>

          {/* Info Box */}
          <div style={{
            background: 'rgba(231, 84, 128, 0.1)',
            border: '1px solid rgba(231, 84, 128, 0.3)',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginBottom: '2rem',
          }}>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              💡 <strong>Nota:</strong> Las tecnologías (Main Stack, Familiar, Tools) se gestionan desde la sección <strong>Stack</strong>. 
              Aquí solo editas las estadísticas rápidas que aparecen en la página Recruiter.
            </p>
          </div>

          {/* Quick Stats */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <label style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                Quick Stats
              </label>
              <button
                onClick={addStat}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #e75480',
                  background: 'rgba(231, 84, 128, 0.2)',
                  color: '#f3b1e6',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                }}
              >
                + Agregar Stat
              </button>
            </div>
            
            <p style={{ margin: '0 0 1.5rem 0', opacity: 0.7, fontSize: '0.9rem' }}>
              Estadísticas que se muestran como tarjetas destacadas. Ejemplos: "years_experience: 2+", "remote: 100%", "projects: 15+"
            </p>

            {quickStats.length === 0 ? (
              <div style={{
                padding: '2rem',
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '0.5rem',
                border: '1px dashed rgba(243, 177, 230, 0.3)',
                opacity: 0.6
              }}>
                No hay stats. Haz clic en "+ Agregar Stat" para crear una.
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {quickStats.map((stat, index) => (
                  <div key={index} style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr auto',
                    gap: '1rem',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(243, 177, 230, 0.2)',
                    alignItems: 'center'
                  }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
                        Label (key)
                      </label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                        placeholder="years_experience"
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          borderRadius: '0.5rem',
                          border: '1px solid rgba(243, 177, 230, 0.3)',
                          background: 'rgba(255, 255, 255, 0.1)',
                          color: '#f3b1e6',
                          fontFamily: 'inherit',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
                        Value
                      </label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                        placeholder="2+"
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          borderRadius: '0.5rem',
                          border: '1px solid rgba(243, 177, 230, 0.3)',
                          background: 'rgba(255, 255, 255, 0.1)',
                          color: '#f3b1e6',
                          fontFamily: 'inherit',
                        }}
                      />
                    </div>

                    <button
                      onClick={() => removeStat(index)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        borderRadius: '0.5rem',
                        border: '1px solid rgba(245, 101, 101, 0.4)',
                        background: 'rgba(245, 101, 101, 0.1)',
                        color: '#feb2b2',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        fontSize: '1.2rem',
                        marginTop: '1.5rem'
                      }}
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Preview */}
          {quickStats.length > 0 && (
            <div style={{
              background: 'rgba(243, 177, 230, 0.1)',
              border: '1px solid rgba(243, 177, 230, 0.3)',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              marginBottom: '2rem',
            }}>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem' }}>Vista Previa</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                {quickStats.map((stat, index) => (
                  stat.label && stat.value && (
                    <div key={index} style={{
                      textAlign: 'center',
                      padding: '1.5rem',
                      background: 'rgba(231, 84, 128, 0.2)',
                      borderRadius: '0.75rem',
                      border: '1px solid #e75480'
                    }}>
                      <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem', color: '#e75480' }}>
                        {stat.value}
                      </div>
                      <div style={{ fontSize: '0.9rem', opacity: 0.9, textTransform: 'capitalize' }}>
                        {stat.label.replace(/_/g, ' ')}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Save Button */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #e75480',
                background: saving ? 'rgba(231, 84, 128, 0.3)' : 'rgba(231, 84, 128, 0.2)',
                color: '#f3b1e6',
                cursor: saving ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit',
                fontSize: '1rem',
              }}
            >
              {saving ? 'Guardando...' : 'Guardar Quick Stats'}
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminRecruiter;