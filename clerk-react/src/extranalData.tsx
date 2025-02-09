import { useAuth } from "@clerk/clerk-react";

export default function ExternalDataPage() {
  const { userId, sessionId, getToken, isLoaded, isSignedIn } = useAuth();

  const fetchExternalData = async () => {
    const token = await getToken();

    // Fetch data from an external API
    const response = await fetch("http://localhost:3000/path", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Sign in to view this page</div>;
  }

  return (
    <div>
      <p>
        Hello, {userId}! Your current active session is {sessionId}.
      </p>
      <button onClick={fetchExternalData}>Fetch Data</button>
    </div>
  );
}
