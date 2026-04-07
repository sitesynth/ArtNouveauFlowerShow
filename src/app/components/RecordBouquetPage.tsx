import { useEffect, useState } from 'react';
import { BouquetHero } from './BouquetHero';

type Status = 'waiting' | 'recording' | 'done';

export function RecordBouquetPage() {
  const [status, setStatus] = useState<Status>('waiting');

  useEffect(() => {
    const onStart = () => setStatus('recording');
    const onDone  = () => setStatus('done');
    document.addEventListener('bouquet-record-start', onStart);
    document.addEventListener('bouquet-record-done',  onDone);
    return () => {
      document.removeEventListener('bouquet-record-start', onStart);
      document.removeEventListener('bouquet-record-done',  onDone);
    };
  }, []);

  const label = {
    waiting:   'Loading model…',
    recording: 'Recording 12 sec…',
    done:      'Done! File bouquet-mobile.webm downloaded. Place it in public/',
  }[status];

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0a0703' }}>
      <BouquetHero className="w-full h-full" recording={true} />
      <div style={{
        position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(10,7,3,0.85)', border: '1px solid #8a7b34',
        color: '#d4c68c', fontFamily: 'sans-serif', fontSize: 14,
        padding: '12px 24px', borderRadius: 4, letterSpacing: '0.05em',
        pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>
        {label}
      </div>
    </div>
  );
}
