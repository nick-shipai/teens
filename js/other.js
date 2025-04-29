async function askOllama(prompt) {
  const response = await fetch('https://ollama-server-x6xy.onrender.com/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'tinyllama', // or 'qwen:1.5b-chat' if you used Qwen
      prompt: prompt
    })
  });

  const data = await response.json();
  console.log("AI says:", data.response);
  return data.response;
}

// Example usage
askOllama("Hello AI, what's your name?");
