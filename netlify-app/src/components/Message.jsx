import React from 'react';
import './Message.css';

const Message = ({ message }) => {
  const { role, content, sources } = message;
  
  return (
    <div className={`message ${role}`}>
      <div className="message-avatar">
        {role === 'user' ? '👤' : '🤖'}
      </div>
      <div className="message-content">
        <p>{content}</p>
        
        {sources && sources.length > 0 && (
          <div className="message-sources">
            <h4>Sources:</h4>
            <ul>
              {sources.map((source, index) => (
                <li key={index}>
                  <p>{source.content}</p>
                  {source.metadata && (
                    <span className="source-metadata">
                      {source.metadata.source || 'Unknown source'}
                      {source.metadata.score && ` (Relevance: ${Math.round(source.metadata.score * 100)}%)`}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
