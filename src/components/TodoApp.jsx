import React, { useReducer, useEffect, useMemo, useState } from 'react';
import { todoReducer, initialTodoState, TODO_ACTIONS } from '../reducers/todoReducer';

export default function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);
  const [text, setText] = useState('');

  // Persistance localStorage de l'état présent
  useEffect(() => {
    localStorage.setItem('app-todos', JSON.stringify(state.present));
  }, [state.present]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch({ type: TODO_ACTIONS.ADD_TODO, payload: text.trim() });
    setText('');
  };

  // Filtrage mémorisé
  const filteredTodos = useMemo(() => {
    return state.present.filter((todo) => {
      if (state.filter === 'COMPLETED') return todo.completed;
      if (state.filter === 'ACTIVE') return !todo.completed;
      return true;
    });
  }, [state.present, state.filter]);

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>📝 Todo App Avancée (S4)</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nouvelle tâche..."
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Ajouter</button>
      </form>

      {/* Barre d'outils (Undo & Filtres) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
        <button
          onClick={() => dispatch({ type: TODO_ACTIONS.UNDO })}
          disabled={state.past.length === 0}
          style={{ padding: '6px 12px' }}
        >
          ↶ Annuler (Undo)
        </button>

        <div style={{ display: 'flex', gap: '5px' }}>
          {['ALL', 'ACTIVE', 'COMPLETED'].map((f) => (
            <button
              key={f}
              onClick={() => dispatch({ type: TODO_ACTIONS.SET_FILTER, payload: f })}
              style={{
                fontWeight: state.filter === f ? 'bold' : 'normal',
                backgroundColor: state.filter === f ? '#007bff' : '#f0f0f0',
                color: state.filter === f ? '#fff' : '#000',
                border: 'none',
                padding: '6px 10px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Liste des tâches */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px 0',
              borderBottom: '1px solid #eee'
            }}
          >
            <span
              onClick={() => dispatch({ type: TODO_ACTIONS.TOGGLE_TODO, payload: todo.id })}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
            >
              {todo.completed ? '✅' : '⏳'} {todo.text}
            </span>
            <button
              onClick={() => dispatch({ type: TODO_ACTIONS.DELETE_TODO, payload: todo.id })}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red' }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}