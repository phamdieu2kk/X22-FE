import { useEffect, useState } from "react";
import axios from "axios";

import "../Components/Products/style.css";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import TopicDetail from "../Components/TopicDetail";

const Topic = () => {
  const [topic, setTopic] = useState({
    data: null,
    isLoading: false,
  });

  useEffect(() => {
    (async () => {
      setTopic((prev) => ({ ...prev, isLoading: true }));
      const { data: _data } = await axios.get("http://103.30.10.141:3000/topic/create");
      setTopic(() => ({ data: _data, isLoading: false }));
    })();
  }, []);

  const { data} = topic;

  console.log(data);
 

  return (
    <>
      <div className="content">
        <div className="title-home">
          <Breadcrumb items={[{ title:<Link to="/">Trang chủ</Link>}, { title: 'Tất cả chủ đề' }]} />
        </div>
      </div>
     
     <TopicDetail/>
     
     
    </>
  );
};

export default Topic;
