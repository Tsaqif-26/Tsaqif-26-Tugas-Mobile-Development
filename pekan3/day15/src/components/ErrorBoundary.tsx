// src/components/ErrorBoundary.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';

type State = { hasError: boolean; error: Error | null };

export default class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Aplikasi mengalami masalah tak terduga.</Text>
          <Button title="Mulai Ulang Aplikasi" onPress={this.handleReset} />
        </View>
      );
    }
    return this.props.children;
  }
}
