/*
 * Responsabilité : appliquer les transitions immuables de la Todo App.
 * L'historique past/present permet l'UNDO sans effet de bord dans le reducer.
 */
export const TODO_ACTIONS = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  DELETE_TODO: 'DELETE_TODO',
  SET_FILTER: 'SET_FILTER',
  UNDO: 'UNDO'
};

export const initialTodoState = {
  present: JSON.parse(localStorage.getItem('app-todos')) || [],
  past: [],
  filter: 'ALL'
};

export function todoReducer(state, action) {
  switch (action.type) {
    case TODO_ACTIONS.ADD_TODO: {
      const newPresent = [
        ...state.present,
        { id: Date.now(), text: action.payload, completed: false }
      ];
      return {
        ...state,
        past: [...state.past, state.present],
        present: newPresent
      };
    }

    case TODO_ACTIONS.TOGGLE_TODO: {
      const newPresent = state.present.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
      return {
        ...state,
        past: [...state.past, state.present],
        present: newPresent
      };
    }

    case TODO_ACTIONS.DELETE_TODO: {
      const newPresent = state.present.filter((todo) => todo.id !== action.payload);
      return {
        ...state,
        past: [...state.past, state.present],
        present: newPresent
      };
    }

    case TODO_ACTIONS.SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };

    case TODO_ACTIONS.UNDO: {
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, state.past.length - 1);
      return {
        ...state,
        past: newPast,
        present: previous
      };
    }

    default:
      return state;
  }
}