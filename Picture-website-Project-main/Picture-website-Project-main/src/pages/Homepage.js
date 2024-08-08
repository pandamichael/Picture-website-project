import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "../components/Search";
import Picture from "../components/Picture";

// 定義一個名為Homepage的無狀態函數式React組件
const Homepage = () => {
    // 在組件中跟蹤狀態數據
    let [input, setInput] = useState("");
    let [data, setData] = useState(null);
    let [page, setPage] = useState(1);
    let [currentSearch, setCurrentSearch] = useState("");

    //API請求
    const auth = "不能說的API授權密鑰";
    const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";

    // 定義一個搜尋圖片的初始URL
    let searchURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1`;

    // 獲取圖片數據
    const search = async(url) => {
        let result = await axios.get(url, {
            headers: { Authorization: auth },
        });

          // 使用函數形式的setData以確保數據合併在最新的data值上
        setData(result.data.photos);
        setCurrentSearch(input);
    };

    // 將新獲取的圖片數據合併
    const morePicture = async() => {
        let newURL;
        setPage(page + 1);
        if (currentSearch === "") {
            newURL = `https://api.pexels.com/v1/curated?page=${page + 1}&per_page=15`;
        } else {
            newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${
        page + 1
      }`;
        }
        console.log("正在morePicture內部");
        console.log(newURL);
        let result = await axios.get(newURL, {
            headers: { Authorization: auth },
        });
        setData(data.concat(result.data.photos));
    };

    // 加載初始的圖片數據
    useEffect(() => {
        search(initialURL);
    }, []);

    // 構建應用程式的使用者界面
    return ( <
        div style = {
            { minHeight: "100vh" }
        } >
        <
        Search search = {
            () => {
                search(searchURL);
            }
        }
        setInput = { setInput }
        />   <
        div className = "pictures" > {
            data &&
            data.map((d) => {
                return <Picture data = { d }
                />;
            })
        } </div>   <
        div className = "morePicture" >
        <
        button onClick = { morePicture } > 更多圖片 </button> 
        </div>
        </div>
    );
};

export default Homepage;