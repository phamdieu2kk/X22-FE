import React, { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb, Card } from "antd";
import { Link } from "react-router-dom";
import api from "../api";

const Topic = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTopics = async () => {
    try {
      const response = await api.topic.invoke({});
      setTopics(response.data.topics);
      setIsLoading(false);
    } catch (error) {
      console.error("Lỗi khi tìm chủ đề:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
    const interval = setInterval(fetchTopics, 5000); // Polling every 5 seconds

    return () => clearInterval(interval);
  }, []);

  console.log(topics);

  return (
    <>
      <div className="content">
        <div className="title-home">
          <Breadcrumb
            items={[
              { title: <Link to="/">Trang chủ</Link> },
              { title: "Tất cả chủ đề" },
            ]}
          />
        </div>
      </div>

      <div className="content">
        <section className="section-danhmuc">
          <div className="row">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              topics.map((topic) => (
                <div
                  key={topic._id}
                  className="col-xxl-2 col-lg-3 col-md-4 col-6"
                >
                  <Card
                    title={topic.title}
                    extra={
                      <Link to={`/topic/${topic._id}/challenges`}>
                        Xem ngay
                      </Link>
                    }
                    style={{ width: 300 }}
                  >
                    <img
                      alt="topic"
                      src={
                        topic.image
                          ? topic.image
                          : "https://via.placeholder.com/300"
                      }
                      style={{ width: "100%", height: "auto" }}
                    />
                    <p>{topic.topicName}</p>
                  </Card>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Topic;
