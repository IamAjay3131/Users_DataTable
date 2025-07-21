import React, { useState, useEffect } from "react";
import { UsersEntity } from "../models/IUser";
import { UserService } from "../services/UserService";
import { Link } from "react-router-dom";
import Search from "./Search";

interface IState {
  loading: boolean;
  users: UsersEntity[];
  errorMsg: string;
  filteredUsersList: UsersEntity[];
}

const UserList: React.FC = () => {
  const [state, setState] = useState<IState>({
    loading: false,
    users: [],
    errorMsg: '',
    filteredUsersList: [],
  });

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      loading: true,
    }));

    UserService.getAllUser()
      .then((res) => {
        setState((prev) => ({
          ...prev,
          loading: false,
          users: res.data.users,
          filteredUsersList: res.data.users,
        }));
      })
      .catch((error) =>
        setState((prev) => ({
          ...prev,
          loading: false,
          errorMsg: error.message,
        }))
      );
  }, []);

  const { loading, errorMsg, filteredUsersList } = state;

  const searchRequest = (searchTextnew: string) => {
    const filtered = state.users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return fullName.includes(searchTextnew.toLowerCase());
    });

    setState((prev) => ({
      ...prev,
      filteredUsersList: filtered,
    }));
  };

  return (
    <div className="container">
      <h1 className="text-center text-bg-info rounded-top-circle">USER LIST</h1>
      <Search  onSearch={searchRequest}/>
    
      {errorMsg && <p>{errorMsg}</p>}
      {loading && <h1>Loading...</h1>}

      <table className="table table-striped table-hover table-bordered text-center">
        <thead>
          <tr className="table-info">
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsersList.length > 0 ? (
            filteredUsersList.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <Link to={`users/${user.id}`} className="text-decoration-none">
                    {user.firstName} {user.lastName}
                  </Link>
                </td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;