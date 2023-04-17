import Link from "next/link";
import Profile from "./Profile";
import { ROLES } from "@/lib/helpers";
import Navbar from "./Navbar";

const menu = {
  admin: [
    {
      text: 'Admin',
      path: '/admin',
    },
    {
      text: 'New Task',
      path: '/admin/new-task',
    },
  ],
  user: [
    {
      text: 'Dashboard',
      path: '/dashboard',
    },
    {
      text: 'Tasks',
      path: '/dashboard/tasks',
    },
  ],
}

const menuItemClassname = 'bg-surface hover:bg-accentSurface text-onSurface border border-solid border-surface hover:border-surfaceBorder rounded-full py-2 px-4';
const activeMenuItemClassname = 'bg-accentSurface text-onSurface border border-solid border-surface border-surfaceBorder rounded-full py-2 px-4';

export default function Header({ role, currentPage }) {
  return (
    <header className="py-4 md:py-6 w-full bg-surface">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
        <h4 className="font-slab text-md font-bold text-secondary block uppercase"><Link href="/">Task Manager</Link></h4>
        <div className="flex justify-center md:justify-end items-center gap-4 flex-grow text-sm md:text-md w-full md:w-auto">
          { role &&
            <Navbar>
              { role === ROLES.admin &&
                <>
                  {menu.admin.map((menu) => (
                    <li key={menu.path}>
                      <Link
                          href={menu.path}
                          className={menu.path === currentPage ? activeMenuItemClassname : menuItemClassname}
                        >
                          {menu.text}
                      </Link>
                    </li>
                  ))}
                </>
              }
              { role === ROLES.user &&
                <>
                  {menu.user.map((menu) => (
                    <li key={menu.path}>
                      <Link
                          href={menu.path}
                          className={menu.path === currentPage ? activeMenuItemClassname : menuItemClassname}
                        >
                          {menu.text}
                      </Link>
                    </li>
                  ))}
                </>
              }
            </Navbar>
          }
          <Profile/>
        </div>
      </div>
    </header>
  )
}