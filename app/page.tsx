import React from 'react';
import ChatWidget from '@/components/ChatWidget';

/**
 * ARCADE_STUDIOS_MOCK
 * Hardcoded configuration to bypass Prisma/Database issues.
 */
const ARCADE_STUDIOS_DATA = {
  name: "Arcade Studios",
  slug: "arcade",
  botName: "Arcade AI",
  primaryColor: "#FF0080", // Bold Arcade Pink/Neon
  initialMessage: "Welcome to the Arcade. 🕹️ Ready to level up your brand's digital presence? How can we help you today?",
  systemPrompt: `
    You are Arcade AI, the creative assistant for Arcade Studios. 
    Arcade Studios is a high-end digital agency specializing in Web3, high-performance web apps, and bold branding.
    Vibe: Edgy, futuristic, confident, and highly creative. 
    Goal: Capture visitor interest in creative services and collect an email for a 'Strategy Session'.
  `,
  bookingUrl: "https://calendly.com/arcade-studios/discovery",
};

export default function Page() {
  return (
    <main style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#050505', // Dark "Arcade" theme
      color: '#ffffff',
      fontFamily: 'Inter, system-ui, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* CSS HACK: This fixes your "white text on white background" typing issue 
        without needing to open your ChatWidget component.
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        input, textarea { 
          color: #000000 !important; 
          background-color: #ffffff !important; 
        }
        input::placeholder { color: #666666 !important; }
      `}} />

      {/* Background Decorative Element (Arcade Style) */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '40%',
        height: '40%',
        background: 'radial-gradient(circle, rgba(255,0,128,0.15) 0%, rgba(0,0,0,0) 70%)',
        zIndex: 0
      }} />

      {/* Main Content */}
      <div style={{ textAlign: 'center', zIndex: 1, padding: '0 1.5rem' }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: 'bold', 
          letterSpacing: '-0.05em',
          marginBottom: '1rem',
          background: 'linear-gradient(to right, #FF0080, #7928CA)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {ARCADE_STUDIOS_DATA.name.toUpperCase()}
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#a1a1aa', 
          maxWidth: '500px',
          lineHeight: '1.6',
          margin: '0 auto 2rem auto'
        }}>
          We build digital experiences that players—and customers—never want to leave.
        </p>
      </div>

      {/* The Chat Widget */}
      <ChatWidget 
        clientSlug={ARCADE_STUDIOS_DATA.slug} 
        config={ARCADE_STUDIOS_DATA} 
      />

      {/* Status Indicator */}
      <div style={{
        position: 'fixed',
        bottom: '30px',
        left: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '12px',
        color: '#4ade80',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
        <span style={{
          width: '8px',
          height: '8px',
          backgroundColor: '#4ade80',
          borderRadius: '50%',
          boxShadow: '0 0 10px #4ade80'
        }} />
        Systems Online
      </div>
    </main>
  );
}