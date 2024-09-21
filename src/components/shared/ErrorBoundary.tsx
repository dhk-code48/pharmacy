"use client";

import React, { Component, ReactNode } from "react";
import { notFound } from "next/navigation";

import { Button } from "../ui/button";
import { Icons } from "./Icons";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    // Define a state variable to track whether there is an error or not
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }

  handleRetry = () => {
    // Refresh the page
    window.location.reload();
  };

  render() {
    // Check if an error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="grid grid-cols-1 place-items-center gap-2 bg-destructive/10 border-destructive/30 border-dashed border-2 rounded p-5 text-center">
          <Icons.alertTriangleFilled className="text-destructive" size={30} />
          <h1 className="text-lg font-bold">Unexpected Error Ocurred</h1>
          <Button type="button" onClick={this.handleRetry}>
            Reload <Icons.refresh size={20} />
          </Button>
        </div>
      );
    }

    // Return children components in case of no error
    return this.props.children;
  }
}

export default ErrorBoundary;
