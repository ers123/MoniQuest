import React from 'react';

interface IconProps {
  className?: string;
}

export const QuestIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.01,2.25L4,8.53l8.01,13.22l8.01-13.22L12.01,2.25z M12.01,4.6L18.4,8.53l-6.39,9.58L5.62,8.53L12.01,4.6z"/>
  </svg>
);

export const StarIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
);

export const ChatIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4zm-6.59 6L12 14.59 8.59 11 12 7.41 15.41 11z"/>
    </svg>
);

// Fix: Add LiraAvatarIcon component
export const LiraAvatarIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-2-9c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm4 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-2 4c-1.48 0-2.75-.81-3.45-2H15.45c-.7 1.19-1.97 2-3.45 2z"/>
    </svg>
);


export const MoneyIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-11h2v2h-2zm0 3h2v5h-2z"/></svg>
);
export const BankIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 10h3v7H4zM10.5 10h3v7h-3zM2 19h20v2H2zM17 10h3v7h-3zM12 1L2 6v2h20V6z"/></svg>
);
export const PriceIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 3.32c-3.21 0-5.78 2.57-5.78 5.78s2.57 5.78 5.78 5.78 5.78-2.57 5.78-5.78-2.57-5.78-5.78-5.78zm.83 8.33h-1.66V8.5h1.66v3.15zm-4.32 6.22l-1.63-1.63c.12-.13.25-.26.39-.39l1.63 1.63c-.13.12-.26.25-.39.39zm3.49 3.49c-1.33 0-2.56-.51-3.49-1.33l-1.63 1.63c1.3.93 2.87 1.51 4.58 1.51s3.28-.58 4.58-1.51l-1.63-1.63c-.93.82-2.16 1.33-3.49 1.33z"/></svg>
);
export const NationIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8-8-3.58-8-8zm4.5-2.5h7v1.5h-7zm0 3h7v1.5h-7z"/></svg>
);
export const InvestmentIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.09-4-4L2 17.08z"/></svg>
);
export const CompanyIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm6 8H8v-2h4v2zm0-4H8v-2h4v2zm0-4H8V9h4v2zm6 8h-4v-2h4v2zm0-4h-4v-2h4v2z"/></svg>
);
export const TradeIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c3.95.49 7 3.85 7 7.93s-3.05 7.44-7 7.93V4.07z"/></svg>
);
export const GovernmentIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 19V5h14v14H5z"/><path d="M12 12.5l-2-1.5-2 1.5v-7h4z"/></svg>
);
export const PsychologyIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
);
export const CrisisIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
);
export const ToolsIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6.2 6.2 9 1.6 4.4C.5 6.8.9 9.9 2.9 11.8c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.4-2.4c.4-.4.4-1.1 0-1.4z"/></svg>
);
export const FutureIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 21c0 1.1.9 2 2 2s2-.9 2-2V3c0-1.1-.9-2-2-2s-2 .9-2 2v18zM6 21c0 1.1.9 2 2 2s2-.9 2-2V10c0-1.1-.9-2-2-2s-2 .9-2 2v11zm10 0c0 1.1.9 2 2 2s2-.9 2-2V10c0-1.1-.9-2-2-2s-2 .9-2 2v11z"/></svg>
);