export async function getTopicById(topicId: string): Promise<any> {
    // The API URL where you're making the GET request, with topic_id as a query parameter
    const apiUrl = `http://localhost:3000/api/topic/get-topic-by-id?topic_id=${encodeURIComponent(topicId)}`;
    
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
  