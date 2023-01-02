import { useGetSerchedUsers, useGetUsers } from "../../api";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { UsersList } from "../../components";
import { debounce } from "../../utils";
import "./user.css";

function Users() {
  const { data: userData } = useGetUsers();
  const [users, setUsers] = useState();
  const [keyword, setKeyWord] = useState(" ");

  const { refetch } = useGetSerchedUsers(keyword, {
    // enabled: !!keyword.replace(/\s+/g, ""),
    enabled: false,
    onSuccess: (data) => {
      setUsers(data);
    },
    onError: () => {
      console.log("user");
    },
  });

  useEffect(() => {
    setUsers(userData);
  }, [userData]);

  const names = users?.map((item) => item.first_name);

  const searchHandler = (e) => {
    let searchTest = e.target.value.replace(/\s+/g, "");
    console.log("search test ", searchTest);
    setKeyWord(searchTest);
    refetch();
  };

  const debounceChange = debounce(searchHandler, 1000);

  return (
    <div className="form-class">
      <input
        onChange={debounceChange}
        className="input-form"
        placeholder="Name search "
      />
      <UsersList names={names} />
    </div>
  );
}

export { Users };
