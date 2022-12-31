import { useGetSerchedUsers, useGetUsers } from "../../api";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { UsersList } from "../../components";
import { debounce } from "../../utils";

function Users() {
  const { data: userData } = useGetUsers();
  const ref = useRef(true);
  const [users, setUsers] = useState();
  const [keyword, setKeyWord] = useState(" ");

  const { refetch } = useGetSerchedUsers(keyword, {
    enabled: !!keyword.replace(/\s+/g, ""),
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
    setKeyWord(searchTest);
  };

  const debounceChange = debounce(searchHandler, 1000);

  return (
    <div>
      <input
        onChange={debounceChange}
        // value={keyword}
        placeholder="Name search "
      />
      <UsersList names={names} />
    </div>
  );
}

export { Users };
