import { useGetUsers } from "../../api";
import React, { useCallback, useEffect, useState } from "react";
import { UsersList } from "../../components";
import { debounce } from "../../utils";
import "./user.css";

function Users() {
  const [keyword, setKeyword] = useState("");
  const { data: userData } = useGetUsers(keyword);
  const names = userData?.map((item) => item.first_name);
  const searchHandler = (e) => {
    e.preventDefault;
    debounceChange(e.target.value);
  };
  const debounceChange = useCallback((value) => request(value), []);
  const request = debounce((value) => {
    setKeyword(value);
  }, 1000);

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
