import { Logout } from 'presentation/atomic-component/molecule';
import { SidebarItem } from 'presentation/atomic-component/atom/sidebar-item';
import { Slide } from '@mui/material';
import { paths } from 'main/config';
import { sidebarItems } from 'main/mock';
import { usePath } from 'data/hooks';
import { useSidebar } from 'store/sidebar/selector';
import type { FC } from 'react';

export const MobileSidebar: FC = () => {
  const { open, setOpen } = useSidebar();
  const { allPathname, lastPathname } = usePath();

  return (
    <Slide direction={'right'} in={open} style={{ overflow: 'auto' }}>
      <div
        className={'flex flex-col justify-between fixed z-40 bg-white w-full h-[calc(100dvh-74px)]'}
      >
        <div className={'flex flex-col gap-1 h-full overflow-auto'}>
          {sidebarItems.map(({ icon, link, name }) => {
            let active = false;

            const lastArray = link.split('/');

            if (allPathname.length === 2 && icon === 'Dashboard') active = true;
            else if (allPathname.length > 2 && lastArray[lastArray.length - 1] === allPathname[2])
              active = true;

            return (
              <SidebarItem
                key={name}
                active={active}
                iconName={icon}
                link={link}
                onClick={(): void => setOpen(false)}
                title={name}
              />
            );
          })}
        </div>

        <div className={'flex flex-col pt-2 border-t'}>
          <SidebarItem
            active={lastPathname === 'profile'}
            iconName={'Person'}
            link={paths.home}
            onClick={(): void => setOpen(false)}
            size={'large'}
            title={'Perfil'}
          />

          <Logout />
        </div>
      </div>
    </Slide>
  );
};
