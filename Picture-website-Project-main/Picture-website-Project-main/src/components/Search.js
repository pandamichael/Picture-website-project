import React, { useState } from "react";

const Search = ({ search, setInput }) => {

  // 將輸入框的值與組件的狀態關聯起來
  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="search">
      {/* 允許用戶在輸入框中輸入搜索關鍵字。 */}
      <input className="input" onChange={inputHandler} type="text" />
      <button onClick={search}>Search</button>
    </div>
  );
};

export default Search;
