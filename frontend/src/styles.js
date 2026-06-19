// src/styles.js
export const PALETTE = {
  bgApp: '#0c111d',
  bgCard: '#161b26',
  bgCardInner: '#1f242f',
  border: '#262c3a',
  primary: '#00bfa5',      
  textMain: '#f9fafb',
  textMuted: '#667085',
  success: '#10b981',
  danger: '#f43f5e',
  warning: '#f59e0b'
};

export const UI_STYLES = {
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '24px',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    color: '#f9fafb',
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid #262c3a',
    gap: '16px'
  },
  tabBar: {
    display: 'flex',
    gap: '24px',
    borderBottom: '1px solid #262c3a',
    marginBottom: '24px',
    paddingBottom: '4px'
  },
  tabButton: (isActive) => ({
    padding: '10px 4px',
    backgroundColor: 'transparent',
    color: isActive ? '#00bfa5' : '#667085',
    border: 'none',
    borderBottom: isActive ? '2px solid #00bfa5' : '2px solid transparent',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '15px'
  }),
  cardContainer: {
    backgroundColor: '#161b26',
    borderRadius: '16px',
    border: '1px solid #262c3a',
    padding: '24px'
  },
  gridConstantes: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
    marginBottom: '24px'
  },
  boxConstante: {
    backgroundColor: '#1f242f',
    padding: '16px',
    borderRadius: '10px',
    border: '1px solid #262c3a'
  },
  selectInput: {
    backgroundColor: '#1f242f',
    color: '#fff',
    border: '1px solid #262c3a',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '14px',
    outline: 'none',
    width: '100%'
  },
  scoreCircle: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 0',
    borderBottom: '1px solid #262c3a'
  },
  progressBarTrack: {
    width: '120px',
    height: '6px',
    backgroundColor: '#1f242f',
    borderRadius: '3px'
  },
  progressBarFill: (value) => ({
    width: `${value}%`,
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: '3px'
  })
};