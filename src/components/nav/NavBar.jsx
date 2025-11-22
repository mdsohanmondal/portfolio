import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);
import { CircleUserRound, Search } from 'lucide-react';

import { navItems } from '#constants/data';

const NavBar = () => {
  return (
    <nav className="font-[iosRegular] w-full bg-[#998fcd] px-5 py-2 select-none flex items-center justify-between">
      <div className="flex items-center justify-center">
        <img src="/images/logo.svg" alt="logo" className="h-6 cursor-pointer" />
        <p className="text-lg font-medium mx-6">Sohan's Portfolio</p>
        <ul className="flex items-center justify-center gap-3 ml-5">
          {navItems.map(({ id, text }) => (
            <li key={id} className="font-medium text-md cursor-pointer">
              {text}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-center gap-5">
        <img className="cursor-pointer" src="/images/wifi.svg" alt="wifi" />
        <img className="cursor-pointer" src="/images/search.svg" alt="search" />
        <img className="cursor-pointer" src="/images/user.svg" alt="user" />

        <time>{dayjs().format('ddd MMM D h:mm A')}</time>
      </div>
    </nav>
  );
};

export default NavBar;
