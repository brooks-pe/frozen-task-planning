import { Component, ReactNode } from 'react';
import { useNavigate } from 'react-router';

interface Props {
  children: ReactNode;
  fallbackPath?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundaryClass extends Component<Props & { navigate: (path: string) => void }, State> {
  constructor(props: Props & { navigate: (path: string) => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-[#f9f9fb]">
          <div className="bg-white p-[32px] rounded-[8px] shadow-lg max-w-[500px] text-center">
            <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[24px] text-[#1c2024] mb-[16px]">
              Something went wrong
            </h1>
            <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#60646c] mb-[24px]">
              We encountered an error while loading this page. Please return to User Management and try again.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                this.props.navigate(this.props.fallbackPath || '/user-management');
              }}
              className="bg-[#004b72] text-white px-[16px] py-[10px] rounded-[4px] font-['Inter:Medium',sans-serif] font-medium text-[14px] cursor-pointer hover:bg-[#003d5c] transition-colors"
            >
              Return to User Management
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrapper component that provides navigate to the class component
export default function ErrorBoundary({ children, fallbackPath }: Props) {
  const navigate = useNavigate();
  return (
    <ErrorBoundaryClass navigate={navigate} fallbackPath={fallbackPath}>
      {children}
    </ErrorBoundaryClass>
  );
}
