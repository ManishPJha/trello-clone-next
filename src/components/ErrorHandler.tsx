import React from "react"

class ErrorBoundary extends React.Component {
    constructor(props: any) {
      super(props)
  
      // Define a state variable to track whether is an error or not
      this.state = { hasError: false }
    }
    static getDerivedStateFromError(error: any) {
      // Update state so the next render will show the fallback UI
  
      return { hasError: true }
    }
    componentDidCatch(error: any, errorInfo: any) {
      // You can use your own error logging service here
      console.log({ error, errorInfo })
    }
    render() {

        const { hasError }: any = this.state;
        const { children }: any = this.props;

      // Check if the error is thrown
      if (hasError) {
        // You can render any custom fallback UI
        return (
          <div>
            <h2>Oops, there is an error!</h2>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again?
            </button>
          </div>
        )
      }
  
      // Return children components in case of no error
  
      return children
    }
  }
  
  export default ErrorBoundary
  