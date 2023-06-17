import Link from "next/link";

export default function LayoutHome({ children }: { children: JSX.Element }) {
  return (
    <>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="p-4 drawer-content">
          <label
            htmlFor="my-drawer-2"
            className="btn bg-yellow-100 text-black drawer-button lg:hidden"
          >
            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
          </label>
          {children}
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-yellow-100 text-base-content">
            <li>
              <Link href="/home">Dashboard</Link>
            </li>
            <li>
              <Link href="/home/myposts">My Posts</Link>
            </li>
            <li>
              <Link href="/home/myprofile">My Profile</Link>
            </li>
            <li>
              <Link href="/home/posts">All Posts</Link>
            </li>
            <li>
              <Link href="/home/users">All Users</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
