import { ExpandLess } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { InstallPWAButton } from 'presentation/atomic-component/atom';
import { QueryName, apiPaths } from 'main/config';
import { thumbnail } from 'main/utils';
import { useEffect, useRef, useState } from 'react';
import { useInfiniteScroll } from 'data/hooks';
import type { Content } from 'domain/models';
import type { FC } from 'react';

export const HomeContent: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isAtTop, setIsAtTop] = useState(true);

  const { data, ...queryData } = useInfiniteScroll<Content>({
    filters: {
      per_page: 10,
      strategy: 'new'
    },
    limit: 10,
    queryName: QueryName.default,
    route: apiPaths.content
  });

  useEffect(() => {
    const handleScroll = (): void => {
      const element = containerRef.current;

      if (!element) return;

      setIsAtTop(element?.scrollTop === 0);

      const isEndPage = element.scrollHeight - element.scrollTop === element.clientHeight;
      const isUpEndPage = element.scrollHeight - element.scrollTop === element.clientHeight * 2;

      const isAtBottom = isEndPage || isUpEndPage;

      if (isAtBottom) queryData.fetchNextPage();
    };

    containerRef.current?.addEventListener('scroll', handleScroll);
    return () => containerRef.current?.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollDown = (): void => {
    containerRef.current?.scrollBy({ behavior: 'smooth', top: 300 });
  };

  const scrollUp = (): void => {
    containerRef.current?.scrollBy({ behavior: 'smooth', top: -300 });
  };

  return (
    <div
      className={
        'h-screen bg-gray-900 select-none overflow-y-scroll snap-y snap-mandatory no-scrollbar scrollbar:w-0'
      }
      ref={containerRef}
    >
      <h1
        className={'hidden tablet:flex absolute top-10 left-20 p-4 font-bold text-white text-4xl'}
      >
        TabTok
      </h1>

      <div className={'flex top-1/2 -translate-y-1/2 flex-col gap-6 absolute z-50 right-0'}>
        <div className={`rounded-full ${isAtTop ? 'bg-gray-800' : 'bg-gray-700'}`}>
          <IconButton color={'inherit'} disabled={isAtTop} onClick={scrollUp}>
            <ExpandLess sx={{ color: 'white', fontSize: 32 }} />
          </IconButton>
        </div>

        <div className={'rounded-full bg-gray-700'}>
          <IconButton onClick={scrollDown}>
            <ExpandLess className={'rotate-180'} sx={{ color: 'white', fontSize: 32 }} />
          </IconButton>
        </div>
      </div>

      {data?.map((item) => (
        <img
          key={item.id}
          alt={'test 1'}
          className={
            'h-full max-w-[800px] mx-auto snap-start flex items-center justify-center w-full object-cover'
          }
          draggable={false}
          src={thumbnail(item.owner_username, item.slug)}
        />
      ))}

      <div className={'absolute bottom-0 right-0'}>
        <InstallPWAButton />
      </div>
    </div>
  );
};
