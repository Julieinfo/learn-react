/* Responsabilité : isoler les erreurs de rendu et proposer un fallback récupérable. */
import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Erreur capturée par l\'ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <h3>⚠️ Une erreur est survenue</h3>
          <p>{this.state.error?.message}</p>
          <button type="button" onClick={this.handleReset}>
            Réessayer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}