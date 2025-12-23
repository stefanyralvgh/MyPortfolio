import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProtectedRoute from '../../components/admin/ProtectedRoute';
import { adminLevels } from '../../utils/adminApi';

interface Level {
  id?: number;
  titles: { en: string; es: string; fr?: string };
  descriptions: { en: string; es: string; fr?: string };
  question: { en: string; es: string; fr?: string };
  options: {
    A: { en: string; es: string; fr?: string };
    B: { en: string; es: string; fr?: string };
  };
  correct_option: 'A' | 'B';
  explanation: { en: string; es: string; fr?: string };
}

const AdminLevels: React.FC = () => {
  const router = useRouter();
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Level | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchLevels();
  }, []);

  const fetchLevels = async () => {
    try {
      const data = await adminLevels.getAll();
      setLevels(data);
    } catch (error) {
      console.error('Error fetching levels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás segura de eliminar este level?')) return;
    try {
      await adminLevels.delete(id);
      fetchLevels();
    } catch (error) {
      alert('Error al eliminar level');
    }
  };

  const handleSave = async (level: Level) => {
    try {
      if (level.id) {
        await adminLevels.update(level.id, level);
      } else {
        await adminLevels.create(level);
      }
      setShowForm(false);
      setEditing(null);
      fetchLevels();
    } catch (error: any) {
      alert(error.response?.data?.errors?.join(', ') || 'Error al guardar');
    }
  };

  if (showForm) {
    return (
      <ProtectedRoute>
        <LevelForm
          level={editing}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
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
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
          }}>
            <h1 style={{ margin: 0, fontSize: '2rem' }}>🎮 Levels</h1>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => {
                  setEditing(null);
                  setShowForm(true);
                }}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #e75480',
                  background: 'rgba(231, 84, 128, 0.2)',
                  color: '#f3b1e6',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                + Nuevo Level
              </button>
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
          </div>

          {loading ? (
            <div>Cargando...</div>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {levels.map((level, index) => (
                <div
                  key={level.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '1rem',
                    padding: '1.5rem',
                    border: '1px solid rgba(243, 177, 230, 0.2)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: '#e75480' }}>
                        Level {index + 1}: {level.titles?.en || 'Sin título'}
                      </h3>
                      <p style={{ margin: '0 0 0.5rem 0', opacity: 0.8 }}>
                        {level.descriptions?.en?.substring(0, 100)}...
                      </p>
                      <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.7 }}>
                        Correcta: {level.correct_option}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => {
                          setEditing(level);
                          setShowForm(true);
                        }}
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
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(level.id!)}
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '0.5rem',
                          border: '1px solid #e75480',
                          background: 'rgba(231, 84, 128, 0.2)',
                          color: '#f3b1e6',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

const LevelForm: React.FC<{
  level: Level | null;
  onSave: (level: Level) => void;
  onCancel: () => void;
}> = ({ level, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Level>(
    level || {
      titles: { en: '', es: '', fr: '' },
      descriptions: { en: '', es: '', fr: '' },
      question: { en: '', es: '', fr: '' },
      options: {
        A: { en: '', es: '', fr: '' },
        B: { en: '', es: '', fr: '' },
      },
      correct_option: 'A',
      explanation: { en: '', es: '', fr: '' },
    }
  );

  const updateField = (field: keyof Level, lang: 'en' | 'es' | 'fr', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...(prev[field] as any),
        [lang]: value,
      },
    }));
  };

  const updateOption = (option: 'A' | 'B', lang: 'en' | 'es' | 'fr', value: string) => {
    setFormData((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        [option]: {
          ...prev.options[option],
          [lang]: value,
        },
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: level?.id });
  };

  const languages = [
    { code: 'en' as const, label: 'English' },
    { code: 'es' as const, label: 'Español' },
    { code: 'fr' as const, label: 'Français' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #181824 0%, #2d193c 100%)',
      padding: '2rem',
      fontFamily: 'Courier New, Monaco, Menlo, monospace',
      color: '#f3b1e6',
      overflowY: 'auto',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem' }}>
          {level ? '✏️ Editar Level' : '➕ Nuevo Level'}
        </h1>

        <form onSubmit={handleSubmit}>
          {(['titles', 'descriptions', 'question', 'explanation'] as Array<keyof Level>).map((field) => (
            <div key={field} style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', textTransform: 'capitalize' }}>
                {field}
              </label>
              {languages.map((lang) => (
                <textarea
                  key={lang.code}
                  value={(formData[field] as any)?.[lang.code] || ''}
                  onChange={(e) => updateField(field, lang.code, e.target.value)}
                  placeholder={`${field} (${lang.label})`}
                  rows={field === 'descriptions' || field === 'explanation' ? 4 : 2}
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
                  required={lang.code === 'en'}
                />
              ))}
            </div>
          ))}

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Options</label>
            {(['A', 'B'] as const).map((option) => (
              <div key={option} style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#e75480', marginBottom: '0.5rem' }}>Option {option}</h3>
                {languages.map((lang) => (
                  <textarea
                    key={lang.code}
                    value={formData.options[option][lang.code] || ''}
                    onChange={(e) => updateOption(option, lang.code, e.target.value)}
                    placeholder={`Option ${option} (${lang.label})`}
                    rows={3}
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
                    required={lang.code === 'en'}
                  />
                ))}
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Correct Option</label>
            <select
              value={formData.correct_option}
              onChange={(e) => setFormData((prev) => ({ ...prev, correct_option: e.target.value as 'A' | 'B' }))}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(243, 177, 230, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#f3b1e6',
                fontFamily: 'inherit',
              }}
              required
            >
              <option value="A">Option A</option>
              <option value="B">Option B</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(243, 177, 230, 0.3)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#f3b1e6',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #e75480',
                background: 'rgba(231, 84, 128, 0.2)',
                color: '#f3b1e6',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLevels;

