import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public declare props: Readonly<Props>;
  public declare state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error?.message || 'An unexpected application error occurred.',
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application ErrorBoundary caught:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F2F7F4] flex items-center justify-center p-6 font-sans">
          <div className="max-w-lg w-full bg-[#FAFDFB] border-2 border-[#163A2D] rounded-2xl p-8 shadow-xl text-center space-y-5">
            <div className="w-14 h-14 rounded-xl bg-[#EAF2ED] border border-[#C8DFD2] text-[#163A2D] flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7 text-amber-600" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#4E7D68]">
                CCNUST Portal Notice
              </span>
              <h1 className="text-2xl font-black text-[#163A2D] uppercase tracking-tight">
                Something Went Wrong
              </h1>
              <p className="text-sm text-[#4E7D68] leading-relaxed">
                We encountered a temporary issue loading this view. Your saved records are safe.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#163A2D] hover:bg-[#0F281E] text-[#FAD02C] font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white hover:bg-[#EAF2ED] text-[#163A2D] border border-[#C8DFD2] font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Return Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
