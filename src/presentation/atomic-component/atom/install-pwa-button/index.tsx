import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import type { FC } from 'react';

export const InstallPWAButton: FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: Event): void => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async (): Promise<void> => {
    if (!deferredPrompt) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promptEvent = deferredPrompt as any;

    promptEvent.prompt();

    const choiceResult = await promptEvent.userChoice;

    console.log('Usuário escolheu:', choiceResult.outcome);

    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  if (!isInstallable) return null;

  return (
    <Button
      className={'fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow'}
      onClick={handleInstallClick}
    >
      Instalar App
    </Button>
  );
};
