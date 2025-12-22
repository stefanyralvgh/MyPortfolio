import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProtectedRoute from '../../components/admin/ProtectedRoute';
import { adminCVs } from '../../utils/adminApi';

const AdminCVs: React.FC = () => {
  const router = useRouter();
  const [cvs, setCvs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    fetchCVs();
  }, []);

  const fetchCVs = async () => {
    try {
      const data = await adminCVs.getAll();
      setCvs(data.cvs || []);
    } catch (error) {
      console.error('Error fetching CVs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (language: 'es' | 'en', file: File) => {
    if (file.type !== 'application/pdf') {
      alert('Solo se permiten archivos PDF');
      return;
    }

    setUploading(language);
    try {
      await adminCVs.upload(language, file);
      alert('CV subido exitosamente');
      fetchCVs();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Error al subir CV');
    } finally {
      setUploading(null);
    }
  };

  const handleDelete = async (language: 'es' | 'en') => {
    if (!confirm(`¿Estás seguro de eliminar el CV en ${language === 'es' ? 'español' : 'inglés'}?`)) return;
    try {
      await adminCVs.delete(language);
      alert('CV eliminado exitosamente');
      fetchCVs();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Error al eliminar CV');
    }
  };

  const getCVForLanguage = (language: 'es' | 'en') => {
    return cvs.find((cv) => cv.filename === `${language}_cv.pdf`);
  };

  return (
    <ProtectedRoute>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #181824 0%, #2d193c 100%)',
        padding: '2rem',
        fontFamily: 'Courier New, Monaco, Menlo, monospace',
        color: '#f3b1e6',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
          }}>
            <h1 style={{ margin: 0, fontSize: '2rem' }}>📄 CVs</h1>
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

          {loading ? (
            <div>Cargando...</div>
          ) : (
            <div style={{ display: 'grid', gap: '2rem' }}>
              {(['es', 'en'] as const).map((lang) => {
                const cv = getCVForLanguage(lang);
                return (
                  <div
                    key={lang}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '1rem',
                      padding: '2rem',
                      border: '1px solid rgba(243, 177, 230, 0.2)',
                    }}
                  >
                    <h2 style={{ margin: '0 0 1rem 0', color: '#e75480' }}>
                      CV en {lang === 'es' ? 'Español' : 'English'}
                    </h2>

                    {cv ? (
                      <div>
                        <p style={{ margin: '0 0 1rem 0', opacity: 0.8 }}>
                          Archivo: {cv.filename}
                        </p>
                        <p style={{ margin: '0 0 1rem 0', opacity: 0.8 }}>
                          Tamaño: {(cv.byte_size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                          <a
                            href={cv.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '0.5rem 1rem',
                              borderRadius: '0.5rem',
                              border: '1px solid rgba(243, 177, 230, 0.3)',
                              background: 'rgba(255, 255, 255, 0.05)',
                              color: '#f3b1e6',
                              textDecoration: 'none',
                              fontFamily: 'inherit',
                            }}
                          >
                            Ver CV
                          </a>
                          <button
                            onClick={() => handleDelete(lang)}
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
                    ) : (
                      <p style={{ margin: '0 0 1rem 0', opacity: 0.7 }}>
                        No hay CV subido para este idioma
                      </p>
                    )}

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                        {cv ? 'Reemplazar CV' : 'Subir CV'}
                      </label>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleUpload(lang, file);
                          }
                        }}
                        disabled={uploading === lang}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          border: '1px solid rgba(243, 177, 230, 0.3)',
                          background: 'rgba(255, 255, 255, 0.1)',
                          color: '#f3b1e6',
                          fontFamily: 'inherit',
                          cursor: uploading === lang ? 'not-allowed' : 'pointer',
                        }}
                      />
                      {uploading === lang && (
                        <p style={{ margin: '0.5rem 0 0 0', opacity: 0.7 }}>
                          Subiendo...
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminCVs;

