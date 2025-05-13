import { type FC, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from 'main/assets';
import { Logout } from 'presentation/atomic-component/molecule';
import { SidebarItem } from 'presentation/atomic-component/atom/sidebar-item';
import { ToggleMenu } from 'presentation/atomic-component/atom';
import { paths } from 'main/config';
import { sidebarItems } from 'main/mock';
import { useAppSelector } from 'store';
import { usePath } from 'data/hooks';

export const LaptopSidebar: FC = () => {
  const containerRef = useRef(null);
  const { open } = useAppSelector((state) => state.sidebar);
  const { allPathname, lastPathname } = usePath();

  return (
    <div
      className={`flex flex-col fixed gap-3 z-40 h-dvh border-r bg-white border-gray-125 transition-[width] ease-in-out ${
        open ? 'w-[230px]' : 'w-[81px]'
      }`}
      ref={containerRef}
    >
      <div
        className={'flex p-4 w-full items-center gap-4 justify-between border-b border-gray-125'}
      >
        <Link className={open ? '' : 'hidden'} to={paths.home}>
          <img alt={'Base Front'} className={'max-h-[40px]'} src={Logo} />
        </Link>

        <ToggleMenu />
      </div>

      <div className={'flex flex-col gap-3 h-full overflow-auto'}>
        {sidebarItems.map(({ icon, link, name, onClick }) => {
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
              onClick={onClick}
              title={name}
            />
          );
        })}
      </div>

      <div
        className={
          'flex flex-col w-full items-center gap-2 pt-3 justify-start border-t border-gray-125'
        }
      >
        <SidebarItem
          active={lastPathname === 'profile'}
          iconName={'Person'}
          link={paths.home}
          size={'small'}
          title={'Perfil'}
        />

        <Logout />
      </div>
    </div>
  );
};
