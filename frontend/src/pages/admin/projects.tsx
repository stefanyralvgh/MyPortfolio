import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProtectedRoute from '../../components/admin/ProtectedRoute';
import { useAuth } from '../../contexts/AuthContext';
import { adminProjects } from '../../utils/adminApi';

interface Project {
  id?: number;
  title: { en: string; es: string; fr?: string };
  role: { en: string; es: string; fr?: string };
  tech: { en: string; es: string; fr?: string };
  description: { en: string; es: string; fr?: string };
  status: { en: string; es: string; fr?: string };
  link: { en: string; es: string; fr?: string };
}

const AdminProjects: React.FC = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await adminProjects.getAll();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás segura de eliminar este proyecto?')) return;
    try {
      await adminProjects.delete(id);
      fetchProjects();
    } catch (error) {
      alert('Error al eliminar proyecto');
    }
  };

  const handleEdit = (project: Project) => {
    setEditing(project);
    setShowForm(true);
  };

  const handleSave = async (project: Project) => {
    try {
      if (project.id) {
        await adminProjects.update(project.id, project);
      } else {
        await adminProjects.create(project);
      }
      setShowForm(false);
      setEditing(null);
      fetchProjects();
    } catch (error: any) {
      alert(error.response?.data?.errors?.join(', ') || 'Error al guardar');
    }
  };

  if (showForm) {
    return (
      <ProtectedRoute>
        <ProjectForm
          project={editing}
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
            <h1 style={{ margin: 0, fontSize: '2rem' }}>📁 Projects</h1>
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
                + Nuevo Project
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
              {projects.map((project) => (
                <div
                  key={project.id}
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
                        {project.title?.en || 'Sin título'}
                      </h3>
                      <p style={{ margin: '0 0 0.5rem 0', opacity: 0.8 }}>
                        {project.description?.en?.substring(0, 100)}...
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleEdit(project)}
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
                        onClick={() => handleDelete(project.id!)}
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

const ProjectForm: React.FC<{
  project: Project | null;
  onSave: (project: Project) => void;
  onCancel: () => void;
}> = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Project>(
    project || {
      title: { en: '', es: '', fr: '' },
      role: { en: '', es: '', fr: '' },
      tech: { en: '', es: '', fr: '' },
      description: { en: '', es: '', fr: '' },
      status: { en: '', es: '', fr: '' },
      link: { en: '', es: '', fr: '' },
    }
  );

  const updateField = (field: keyof Project, lang: 'en' | 'es' | 'fr', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...(prev[field] as any),
        [lang]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: project?.id });
  };

  const languages: Array<{ code: 'en' | 'es' | 'fr'; label: string }> = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #181824 0%, #2d193c 100%)',
      padding: '2rem',
      fontFamily: 'Courier New, Monaco, Menlo, monospace',
      color: '#f3b1e6',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem' }}>
          {project ? '✏️ Editar Project' : '➕ Nuevo Project'}
        </h1>

        <form onSubmit={handleSubmit}>
          {(['title', 'role', 'tech', 'description', 'status', 'link'] as Array<keyof Project>).map((field) => (
            <div key={field} style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', textTransform: 'capitalize' }}>
                {field}
              </label>
              {languages.map((lang) => (
                <div key={lang.code} style={{ marginBottom: '0.5rem' }}>
                  <input
                    type="text"
                    value={(formData[field] as any)?.[lang.code] || ''}
                    onChange={(e) => updateField(field, lang.code, e.target.value)}
                    placeholder={`${field} (${lang.label})`}
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
                    required={lang.code === 'en'}
                  />
                </div>
              ))}
            </div>
          ))}

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

export default AdminProjects;

