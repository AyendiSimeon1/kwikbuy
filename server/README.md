mutation CreateChatbot($input: ChatbotInput!) {
  createChatbot(input: {
    name: "Customer Support Bot"
    description: "Handles common customer queries"
    flow: {
      nodes: [
        {
          id: "start"
          type: MESSAGE
          data: {
            title: "Welcome"
            content: "Hello! How can I help you today?"
            buttons: [
              { text: "Product Info", value: "products" },
              { text: "Support", value: "support" }
            ]
          }
        }
        # Add more nodes as needed
      ]
      edges: [
        { source: "start", target: "products", condition: "button_click" }
      ]
      startNode: "start"
    }
  }) {
    id
    status
  }
}