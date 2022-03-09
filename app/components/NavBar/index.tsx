import { User } from "@prisma/client";
import { Link } from "@remix-run/react";
import { Button } from "~/components/button";

interface Props {
  user: User;
}
export const NavBar: React.FC<Props> = ({ user }) => {
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Workout Tracker
          </span>
        </a>

        <div className="w-full block w-auto">
          <ul className="flex flex-col mt-4 flex-row mt-0 text-sm font-medium">
            <li className="text-white">
              {user ? (
                <form action="/logout" method="post">
                  <Button type="submit" className="button">
                    Logout
                  </Button>
                </form>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
