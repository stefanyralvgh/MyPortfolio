import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProtectedRoute from '../../components/admin/ProtectedRoute';
import { adminProfile } from '../../utils/adminApi';

interface RecruiterData {
    main_stack?: { en?: string; es?: string; fr?: string };
    familiar?: { en?: string; es?: string; fr?: string };
    quick_stats?: {
      years_experience?: string;
      remote?: string;
    };
  }

const AdminRecruiter: React.FC = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<RecruiterData>({
    main_stack: { en: '', es: '', fr: '' },
    familiar: { en: '', es: '', fr: '' },
    quick_stats: { years_experience: '', remote: '' },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await adminProfile.get();
      setProfile({
        main_stack: data.main_stack || { en: '', es: '', fr: '' },
        familiar: data.familiar || { en: '', es: '', fr: '' },
        quick_stats: data.quick_stats || { years_experience: '', remote: '' },
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminProfile.update(profile);
      alert('Datos de recruiter actualizados exitosamente');
      fetchProfile();
    } catch (error: any) {
      alert(error.response?.data?.errors?.join(', ') || 'Error al guardar');
    } finally {
      setSaving(false);
    }
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

  const languages = [
    { code: 'en' as const, label: 'English' },
    { code: 'es' as const, label: 'Español' },
    { code: 'fr' as const, label: 'Français' },
  ];

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
            <h1 style={{ margin: 0, fontSize: '2rem' }}>💼 Recruiter Page</h1>
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

          {/* Main Stack */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '1.2rem' }}>
              Main Stack
            </label>
            <p style={{ margin: '0 0 1rem 0', opacity: 0.7, fontSize: '0.9rem' }}>
              Lista principal de tecnologías
            </p>
            {languages.map((lang) => (
              <textarea
                key={lang.code}
                value={profile.main_stack?.[lang.code] || ''}
                onChange={(e) => setProfile({
                  ...profile,
                  main_stack: {
                    ...profile.main_stack,
                    [lang.code]: e.target.value,
                  },
                })}
                placeholder={`Main stack (${lang.label})`}
                rows={2}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(243, 177, 230, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#f3b1e6',
                  fontFamily: 'inherit',
                  marginBottom: '0.5rem',
                  resize: 'vertical',
                }}
              />
            ))}
          </div>

          {/* Familiar */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '1.2rem' }}>
              Familiar With
            </label>
            <p style={{ margin: '0 0 1rem 0', opacity: 0.7, fontSize: '0.9rem' }}>
              Tecnologías con las que también estás familiarizada
            </p>
            {languages.map((lang) => (
              <textarea
                key={lang.code}
                value={profile.familiar?.[lang.code] || ''}
                onChange={(e) => setProfile({
                  ...profile,
                  familiar: {
                    ...profile.familiar,
                    [lang.code]: e.target.value,
                  },
                })}
                placeholder={`Familiar with (${lang.label})`}
                rows={2}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(243, 177, 230, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#f3b1e6',
                  fontFamily: 'inherit',
                  marginBottom: '0.5rem',
                  resize: 'vertical',
                }}
              />
            ))}
          </div>

          {/* Quick Stats */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '1.2rem' }}>
              Quick Stats
            </label>
            <p style={{ margin: '0 0 1rem 0', opacity: 0.7, fontSize: '0.9rem' }}>
              Estadísticas rápidas (ej: "2+", "100%")
            </p>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.9 }}>
                Years of Experience
              </label>
              <input
                type="text"
                value={profile.quick_stats?.years_experience || ''}
                onChange={(e) => setProfile({
                  ...profile,
                  quick_stats: {
                    ...profile.quick_stats,
                    years_experience: e.target.value,
                  },
                })}
                placeholder="ej: 2+"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(243, 177, 230, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#f3b1e6',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.9 }}>
                Remote
              </label>
              <input
                type="text"
                value={profile.quick_stats?.remote || ''}
                onChange={(e) => setProfile({
                  ...profile,
                  quick_stats: {
                    ...profile.quick_stats,
                    remote: e.target.value,
                  },
                })}
                placeholder="ej: 100%"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(243, 177, 230, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#f3b1e6',
                  fontFamily: 'inherit',
                }}
              />
            </div>
          </div>

          {/* Note about projects */}
          <div style={{
            background: 'rgba(231, 84, 128, 0.1)',
            border: '1px solid rgba(231, 84, 128, 0.3)',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginBottom: '2rem',
          }}>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              💡 <strong>Nota:</strong> Los proyectos mostrados en la página Recruiter se toman automáticamente de la sección Projects. 
              Para editarlos, ve a Projects en el dashboard.
            </p>
          </div>

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
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminRecruiter;