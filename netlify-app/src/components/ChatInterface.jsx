import React from 'react';
import './ChatInterface.css';
import Message from './Message';
import { generateResponse } from '../utils/groqClient';

class ChatInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          role: 'assistant',
          content: 'Welcome to XyLo.Dev! How can I assist you today?'
        }
      ],
      input: '',
      isLoading: false,
      error: null
    };
    this.messagesEndRef = React.createRef();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  handleInputChange = (e) => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.state.input.trim()) return;

    const userMessage = { role: 'user', content: this.state.input };
    const currentInput = this.state.input;
    
    this.setState(
      prevState => ({
        messages: [...prevState.messages, userMessage],
        input: '',
        isLoading: true,
        error: null
      }),
      async () => {
        try {
          console.log('Processing message:', currentInput);
          
          // Use client-side processing for the demo
          // In production, this would call a secure backend API endpoint
          // that handles the API keys securely
          const data = await generateResponse(currentInput);
          console.log('Response generated:', data);
          
          const botMessage = { 
            role: 'assistant', 
            content: data.response,
            sources: data.sources
          };
          
          this.setState(prevState => ({
            messages: [...prevState.messages, botMessage],
            isLoading: false
          }));
        } catch (error) {
          console.error('Error processing message:', error);
          const errorMessage = { 
            role: 'assistant', 
            content: 'Sorry, there was an error processing your request. Please try again.' 
          };
          
          this.setState(prevState => ({
            messages: [...prevState.messages, errorMessage],
            isLoading: false,
            error: error.message
          }));
        }
      }
    );
  };

  render() {
    return (
      <div className="chat-container">
        <div className="messages-container">
          {this.state.messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
          {this.state.isLoading && (
            <div className="loading-indicator">
              <div className="loading-spinner"></div>
            </div>
          )}
          <div ref={this.messagesEndRef} />
        </div>
        <form className="input-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.input}
            onChange={this.handleInputChange}
            placeholder="Ask me anything..."
            disabled={this.state.isLoading}
          />
          <button type="submit" disabled={this.state.isLoading || !this.state.input.trim()}>
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default ChatInterface;
