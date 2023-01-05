import { useGetSerchedUsers, useGetUsers } from "../../api";
import React, { useCallback, useEffect, useState } from "react";
import { UsersList } from "../../components";
import { debounce } from "../../utils";
import "./user.css";

function Users() {
  const { data: userData } = useGetUsers();
  const [users, setUsers] = useState();
  const [keyword, setKeyWord] = useState(" ");

  const { refetch, isLoading } = useGetSerchedUsers(keyword, {
    enabled: false,
    onSuccess: (data) => {
      setUsers(data);
    },
    onError: () => {
      console.error(data);
    },
  });

  // if (isLoading) {
  //   return "loading...";
  // }

  useEffect(() => {
    setUsers(userData);
  }, [userData]);

  const names = users?.map((item) => item.first_name);

  const searchHandler = (e) => {
    let searchTest = e.target.value.replace(/\s+/g, "");
    if (!!searchTest) {
      setKeyWord(searchTest);
      debounceChange();
    }
  };

  const debounceChange = useCallback(
    debounce(() => refetch(), 1000),
    []
  );

  return (
    <div className="form-class">
      <input
        onChange={searchHandler}
        className="input-form"
        placeholder="Name search "
      />
      <UsersList names={names} />
    </div>
  );
}

export { Users };
