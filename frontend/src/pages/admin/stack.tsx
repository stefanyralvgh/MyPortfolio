import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProtectedRoute from '../../components/admin/ProtectedRoute';
import { adminStackItems } from '../../utils/adminApi';

interface StackItem {
  id?: number;
  name: string;
  icon: string;
  category: 'main' | 'familiar' | 'tools';
  level?: 'Advanced' | 'Intermediate' | 'Basic';
  position: number;
}

const AdminStack: React.FC = () => {
  const router = useRouter();
  const [items, setItems] = useState<StackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<StackItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await adminStackItems.getAll();
      setItems(data);
    } catch (error) {
      console.error('Error fetching stack items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este item?')) return;
    try {
      await adminStackItems.delete(id);
      fetchItems();
    } catch (error) {
      alert('Error al eliminar item');
    }
  };

  const handleSave = async (item: StackItem) => {
    try {
      if (item.id) {
        await adminStackItems.update(item.id, item);
      } else {
        await adminStackItems.create(item);
      }
      setShowForm(false);
      setEditing(null);
      fetchItems();
    } catch (error: any) {
      alert(error.response?.data?.errors?.join(', ') || 'Error al guardar');
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'main': return '🚀 Main Stack';
      case 'familiar': return '🔧 Familiar';
      case 'tools': return '🛠️ Tools';
      default: return category;
    }
  };

  const getLevelColor = (level?: string) => {
    switch (level) {
      case 'Advanced': return '#10b981';
      case 'Intermediate': return '#f59e0b';
      case 'Basic': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const filteredItems = filterCategory === 'all' 
    ? items 
    : items.filter(item => item.category === filterCategory);

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, StackItem[]>);

  if (showForm) {
    return (
      <ProtectedRoute>
        <StackForm
          item={editing}
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
            <h1 style={{ margin: 0, fontSize: '2rem' }}>🛠️ Tech Stack</h1>
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
                + Nuevo Item
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

          {/* Filter */}
          <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
            {['all', 'main', 'familiar', 'tools'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(243, 177, 230, 0.3)',
                  background: filterCategory === cat ? 'rgba(231, 84, 128, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  color: '#f3b1e6',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {cat === 'all' ? '📋 Todos' : getCategoryLabel(cat)}
              </button>
            ))}
          </div>

          {loading ? (
            <div>Cargando...</div>
          ) : (
            <div style={{ display: 'grid', gap: '2rem' }}>
              {Object.entries(groupedItems).map(([category, categoryItems]) => (
                <div key={category}>
                  <h2 style={{ color: '#e75480', marginBottom: '1rem' }}>
                    {getCategoryLabel(category)} ({categoryItems.length})
                  </h2>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {categoryItems.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '1rem',
                          padding: '1.5rem',
                          border: '1px solid rgba(243, 177, 230, 0.2)',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                            <div>
                              <h3 style={{ margin: '0 0 0.25rem 0', color: '#f3b1e6' }}>
                                {item.name}
                              </h3>
                              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                {item.level && (
                                  <span
                                    style={{
                                      padding: '0.25rem 0.75rem',
                                      borderRadius: '1rem',
                                      fontSize: '0.75rem',
                                      fontWeight: '500',
                                      color: 'white',
                                      background: getLevelColor(item.level),
                                    }}
                                  >
                                    {item.level}
                                  </span>
                                )}
                                <span style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                                  Position: {item.position}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              onClick={() => {
                                setEditing(item);
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
                              onClick={() => handleDelete(item.id!)}
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

const StackForm: React.FC<{
  item: StackItem | null;
  onSave: (item: StackItem) => void;
  onCancel: () => void;
}> = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState<StackItem>(
    item || {
      name: '',
      icon: '',
      category: 'main',
      level: 'Intermediate',
      position: 0,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: item?.id });
  };

  const needsLevel = formData.category === 'main' || formData.category === 'familiar';

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #181824 0%, #2d193c 100%)',
      padding: '2rem',
      fontFamily: 'Courier New, Monaco, Menlo, monospace',
      color: '#f3b1e6',
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem' }}>
          {item ? '✏️ Editar Item' : '➕ Nuevo Item'}
        </h1>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Nombre</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="ej: Node.js"
              required
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

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Icono (emoji)</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="ej: 🟢"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(243, 177, 230, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#f3b1e6',
                fontFamily: 'inherit',
                fontSize: '1.5rem',
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Categoría</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ 
                ...formData, 
                category: e.target.value as 'main' | 'familiar' | 'tools',
                level: e.target.value === 'tools' ? undefined : formData.level
              })}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(243, 177, 230, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#f3b1e6',
                fontFamily: 'inherit',
              }}
            >
              <option value="main">Main Stack</option>
              <option value="familiar">Familiar</option>
              <option value="tools">Tools</option>
            </select>
          </div>

          {needsLevel && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Nivel</label>
              <select
                value={formData.level || 'Intermediate'}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  level: e.target.value as 'Advanced' | 'Intermediate' | 'Basic'
                })}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(243, 177, 230, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#f3b1e6',
                  fontFamily: 'inherit',
                }}
              >
                <option value="Advanced">Advanced</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
              </select>
            </div>
          )}

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              Posición (orden de aparición)
            </label>
            <input
              type="number"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: parseInt(e.target.value) })}
              min="0"
              required
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

export default AdminStack;