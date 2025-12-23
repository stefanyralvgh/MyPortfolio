import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProtectedRoute from '../../components/admin/ProtectedRoute';
import { useAuth } from '../../contexts/AuthContext';
import { adminProjects, adminLevels, adminProfile } from '../../utils/adminApi';

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    projects: 0,
    levels: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, levels] = await Promise.all([
          adminProjects.getAll(),
          adminLevels.getAll(),
        ]);
        setStats({
          projects: projects.length,
          levels: levels.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <ProtectedRoute>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #181824 0%, #2d193c 100%)',
        padding: '2rem',
        fontFamily: 'Courier New, Monaco, Menlo, monospace',
        color: '#f3b1e6',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid rgba(243, 177, 230, 0.2)',
          }}>
            <h1 style={{
              margin: 0,
              fontSize: '2rem',
              color: '#f3b1e6',
            }}>
              📊 Panel de Administración
            </h1>
            <button
              onClick={logout}
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
              Cerrar Sesión
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: '1px solid rgba(243, 177, 230, 0.2)',
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#e75480', marginBottom: '0.5rem' }}>
                {loading ? '...' : stats.projects}
              </div>
              <div style={{ color: '#f3b1e6', fontSize: '1rem' }}>Projects</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: '1px solid rgba(243, 177, 230, 0.2)',
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#e75480', marginBottom: '0.5rem' }}>
                {loading ? '...' : stats.levels}
              </div>
              <div style={{ color: '#f3b1e6', fontSize: '1rem' }}>Levels</div>
            </div>
          </div>

          {/* Navigation */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
          }}>
            <NavCard
              title="📁 Projects"
              description="Gestionar proyectos del portfolio"
              onClick={() => router.push('/admin/projects')}
            />
            <NavCard
              title="🎮 Levels"
              description="Gestionar niveles de la aventura"
              onClick={() => router.push('/admin/levels')}
            />
            <NavCard
              title="👤 Profile"
              description="Editar información personal"
              onClick={() => router.push('/admin/profile')}
            />
            <NavCard
              title="📄 CVs"
              description="Subir y gestionar CVs"
              onClick={() => router.push('/admin/cvs')}
            />
            <NavCard
              title="💼 Recruiter"
              description="Editar página para reclutadores"
              onClick={() => router.push('/admin/recruiter')}
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

const NavCard: React.FC<{
  title: string;
  description: string;
  onClick: () => void;
}> = ({ title, description, onClick }) => (
  <div
    onClick={onClick}
    style={{
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '1rem',
      padding: '2rem',
      border: '1px solid rgba(243, 177, 230, 0.2)',
      cursor: 'pointer',
      transition: 'all 0.3s',
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
      e.currentTarget.style.borderColor = '#e75480';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
      e.currentTarget.style.borderColor = 'rgba(243, 177, 230, 0.2)';
    }}
  >
    <h2 style={{
      margin: '0 0 0.5rem 0',
      fontSize: '1.5rem',
      color: '#f3b1e6',
    }}>
      {title}
    </h2>
    <p style={{
      margin: 0,
      color: '#f3b1e6',
      opacity: 0.8,
      fontSize: '0.9rem',
    }}>
      {description}
    </p>
  </div>
);

export default AdminDashboard;

