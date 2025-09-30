import { useLynxGlobalEventListener, useState } from '@lynx-js/react';

export function useEventManager(): string {
  const [eventLog, setEventLog] = useState('');

  useLynxGlobalEventListener('exposure', e => {
    (e as { 'exposure-id': string }[]).forEach(item => {
      setEventLog(log => log + (log === '' ? '' : ', ') + item['exposure-id']);
    });
  });

  useLynxGlobalEventListener('disexposure', e => {
    let log = eventLog.split(', ');
    (e as { 'exposure-id': string }[]).forEach(item => {
      log = log.filter(id => id !== item['exposure-id']);
    });
    log.sort();
    setEventLog(log.join(', '));
  });

  return eventLog;
}
