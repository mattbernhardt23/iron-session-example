export async function getAllTopics(): Promise<any> {
    // The API URL where you're making the GET request
    const apiUrl = "http://localhost:3000/api/feed";
  
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`Error fetching topic: ${response.statusText}`);
      }
  
      // Parse the JSON response
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error; // Re-throw the error for handling by the caller
    }
  }