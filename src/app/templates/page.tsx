import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    // Redirect back to home — templates were removed per request
    window.location.href = "/";
  }, []);

  return (
    <div style={{padding:40, textAlign:'center'}}>
      <h1>Templates Removed</h1>
      <p>Templates have been removed by repository owner request. Redirecting to home...</p>
    </div>
  );
}
