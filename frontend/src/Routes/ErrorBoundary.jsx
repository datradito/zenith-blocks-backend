import { message } from "antd";
import React, { Component } from "react";
import ErrorFallback from "../Components/atoms/ErrorFallback/ErrorFallback";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError = (error) => {
    return { hasError: true };
  };

  componentDidCatch = (error, errorInfo) => {
    message.error("Something went wrong." + error);
  };

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} resetErrorBoundary={() => window.location.replace("/dashboard")} />;;
    } else {
      return this.props.children;
    }
  }
}
