import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { deleteUser, getAllUsers } from "../helper/helper.js";
import styles from "../styles/admin.module.css";
import { Link } from "react-router-dom";

export default function DeleteUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching users:", error);
      }
    };

    fetchData();

    return () => {
      setUsers([]);
      setLoading(true);
    };
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);

      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!users || users.length === 0) {
    return <div>No users found</div>;
  }

  return (
    <div className="h-screen flex dark:text-slate-200">
      <nav
        className={`${styles.navigation} bg-white h-full py-4 px-6 flex flex-col justify-between`}
      >
        <div className="flex justify-between items-center mb-4">
          <ul className="group:opcity-100 dark:border-slate-800 dark:bg-slate-900 flex flex-col">
            <li className="group relative">
              <Link
                to="/admin"
                className="block px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
              >
                Home
              </Link>
            </li>
            <li className="group relative">
              <Link
                to="/admin/manageproducts"
                className="block px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
              >
                Manage Products
              </Link>
            </li>
            <li className="group relative">
              <Link
                to="/admin/manageusers"
                className="block px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
              >
                Manage Users
              </Link>
            </li>
            <li className="group relative">
              <a
                href="/profileAdmin"
                className="block px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
              >
                Profile
              </a>
            </li>
          </ul>
        </div>
      </nav>
      3
      <div className="container mx-auto px-8 py-8 sm:px-12 mt-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-lg text-gray-900">{user.username}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-lg text-gray-900">{user.email}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
