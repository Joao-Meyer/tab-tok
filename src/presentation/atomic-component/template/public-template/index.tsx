import { DonutLargeTwoTone, Upcoming } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useRef } from 'react';
import type { FC } from 'react';

const images = ['/icon.png', '/icon.png', '/icon.png'];

export const PublicTemplate: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollDown = (): void => {
    containerRef.current?.scrollBy({ behavior: 'smooth', top: 300 });
  };

  const scrollUp = (): void => {
    containerRef.current?.scrollBy({ behavior: 'smooth', top: -300 });
  };

  return (
    <div
      className={
        'h-screen select-none overflow-y-scroll snap-y snap-mandatory no-scrollbar scrollbar:w-0'
      }
      ref={containerRef}
    >
      <div className={'flex flex-col gap-6 absolute z-50 right-0 top-0'}>
        <IconButton onClick={scrollUp}>
          <Upcoming />
        </IconButton>

        <IconButton onClick={scrollDown}>
          <DonutLargeTwoTone />
        </IconButton>
      </div>

      {images.map((image) => (
        <img
          key={image}
          alt={'test 1'}
          className={
            'h-full max-w-[800px] mx-auto snap-start flex items-center justify-center w-full object-cover'
          }
          draggable={false}
          src={image}
        />
      ))}
    </div>
  );
};
