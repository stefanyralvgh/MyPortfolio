import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProtectedRoute from '../../components/admin/ProtectedRoute';
import { adminProfile } from '../../utils/adminApi';

interface ProfileData {
  name?: { en: string; es: string; fr?: string };
  subtitle?: { en: string; es: string; fr?: string };
  bio?: { en: string; es: string; fr?: string };
  story?: { en: string; es: string; fr?: string };
  why?: { en: string; es: string; fr?: string };
  personality?: { en: string; es: string; fr?: string };
  values?: { en: string[]; es: string[]; fr?: string[] };
  fun_facts?: { en: string[]; es: string[]; fr?: string[] };
  main_stack?: { en: string; es: string; fr?: string };
  familiar?: { en: string; es: string; fr?: string };
  recruiter_projects?: any;
  quick_stats?: any;
  social_links?: {
    linkedin?: string;
    github?: string;
    email?: string;
  };
}

const AdminProfile: React.FC = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await adminProfile.get();
      setProfile(data);
      if (data.photo_url) {
        setPhotoPreview(data.photo_url);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateField = (field: keyof ProfileData, lang: 'en' | 'es' | 'fr', value: string | string[]) => {
    setProfile((prev) => ({
      ...prev,
      [field]: {
        ...(prev?.[field] as any),
        [lang]: value,
      },
    }));
  };

  const updateArrayField = (field: 'values' | 'fun_facts', lang: 'en' | 'es' | 'fr', index: number, value: string) => {
    setProfile((prev) => {
      const current = (prev?.[field] as any)?.[lang] || [];
      const updated = [...current];
      updated[index] = value;
      return {
        ...prev,
        [field]: {
          ...(prev?.[field] as any),
          [lang]: updated,
        },
      };
    });
  };

  const addArrayItem = (field: 'values' | 'fun_facts', lang: 'en' | 'es' | 'fr') => {
    setProfile((prev) => {
      const current = (prev?.[field] as any)?.[lang] || [];
      return {
        ...prev,
        [field]: {
          ...(prev?.[field] as any),
          [lang]: [...current, ''],
        },
      };
    });
  };

  const removeArrayItem = (field: 'values' | 'fun_facts', lang: 'en' | 'es' | 'fr', index: number) => {
    setProfile((prev) => {
      const current = (prev?.[field] as any)?.[lang] || [];
      const updated = current.filter((_: any, i: number) => i !== index);
      return {
        ...prev,
        [field]: {
          ...(prev?.[field] as any),
          [lang]: updated,
        },
      };
    });
  };

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    try {
      await adminProfile.update(profile, photoFile || undefined);
      alert('Profile actualizado exitosamente');
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
            <h1 style={{ margin: 0, fontSize: '2rem' }}>👤 Profile</h1>
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

          {/* Photo Upload */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Foto de Perfil</label>
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Preview"
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem',
                }}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{
                padding: '0.5rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(243, 177, 230, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#f3b1e6',
                fontFamily: 'inherit',
              }}
            />
          </div>

          {/* Text Fields */}
          {(['name', 'subtitle', 'bio', 'story', 'why', 'personality', 'main_stack', 'familiar'] as Array<keyof ProfileData>).map((field) => (
            <div key={field} style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', textTransform: 'capitalize' }}>
                {field.replace('_', ' ')}
              </label>
              {languages.map((lang) => (
                <textarea
                  key={lang.code}
                  value={(profile?.[field] as any)?.[lang.code] || ''}
                  onChange={(e) => updateField(field, lang.code, e.target.value)}
                  placeholder={`${field} (${lang.label})`}
                  rows={field === 'bio' || field === 'story' || field === 'why' || field === 'personality' ? 6 : 2}
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
          ))}

          {/* Array Fields */}
          {(['values', 'fun_facts'] as const).map((field) => (
            <div key={field} style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', textTransform: 'capitalize' }}>
                {field.replace('_', ' ')}
              </label>
              {languages.map((lang) => (
                <div key={lang.code} style={{ marginBottom: '1rem' }}>
                  <div style={{ marginBottom: '0.5rem', color: '#e75480' }}>{lang.label}</div>
                  {(profile?.[field] as any)?.[lang.code]?.map((item: string, index: number) => (
                    <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateArrayField(field, lang.code, index, e.target.value)}
                        placeholder={`Item ${index + 1}`}
                        style={{
                          flex: 1,
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          border: '1px solid rgba(243, 177, 230, 0.3)',
                          background: 'rgba(255, 255, 255, 0.1)',
                          color: '#f3b1e6',
                          fontFamily: 'inherit',
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem(field, lang.code, index)}
                        style={{
                          padding: '0.5rem',
                          borderRadius: '0.5rem',
                          border: '1px solid #e75480',
                          background: 'rgba(231, 84, 128, 0.2)',
                          color: '#f3b1e6',
                          cursor: 'pointer',
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem(field, lang.code)}
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
                    + Agregar {lang.label}
                  </button>
                </div>
              ))}
            </div>
          ))}

          {/* Social Links */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Social Links</label>
            {(['linkedin', 'github', 'email'] as const).map((link) => (
              <input
                key={link}
                type="text"
                value={profile?.social_links?.[link] || ''}
                onChange={(e) => setProfile((prev) => ({
                  ...prev,
                  social_links: {
                    ...prev?.social_links,
                    [link]: e.target.value,
                  },
                }))}
                placeholder={link.charAt(0).toUpperCase() + link.slice(1)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(243, 177, 230, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#f3b1e6',
                  fontFamily: 'inherit',
                  marginBottom: '0.5rem',
                }}
              />
            ))}
          </div>

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

export default AdminProfile;

