import { useEffect, useState } from "react";

import { Breadcrumb, Card, Pagination } from "antd";
import { Link } from "react-router-dom";
import api from "../api";

const Topic = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const pageSize = 10; // Kích thước trang
  // // State để điều khiển hiệu ứng polling
  // const [isPolling, setIsPolling] = useState(true); 
  const fetchTopics = async () => {
    try {
      const response = await api.topic.invoke({ page: currentPage, pageSize });
      setTopics(response.data.topics);
      setIsLoading(false);
    } catch (error) {
      console.error("Lỗi khi tìm chủ đề:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [currentPage]); // Fetch dữ liệu mới khi currentPage thay đổi

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //     fetchTopics();
  //     const interval = setInterval(fetchTopics, 5000); // Polling every 5 seconds

  //   // Dừng polling nếu isPolling là false
  //   if (!isPolling) {
  //     clearInterval(interval);
  //   }
  //  // Dừng polling nếu isPolling là false
  //  if (!isPolling) {
  //   clearInterval(interval);
  // }

  // return () => clearInterval(interval);
  // }, [isPolling]); // Thêm isPolling vào dependency array để useEffect re-run khi isPolling thay đổi


  console.log(topics);

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
                  style={{ width: 300 }}
                >
                  <img
                    alt="topic-img"
                    src={
                      topic.image
                        ? topic.image
                        : "https://2.bp.blogspot.com/-G3nYpK1Gnlw/VI2BDS9g38I/AAAAAAAAiKk/DTPhZEDuKPM/s1600/cau-do-dan-gian.jpg"
                    }
                    style={{ width: "100%", height: "auto" }}
                  />


                  <div className="topic-detail" >
                    <h3>{topic.topicName}</h3>

                    <h3>
                      <Link to={`/topic/${topic._id}/challenges`}>
                        Chơi Ngay
                      </Link>
                    </h3>
                  </div>
                </Card>
              </div>
            ))
          )}
        </div>
      </section>


      {/* Hiển thị nút phân trang */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Pagination
          total={topics.length} // Tổng số mục
          pageSize={pageSize} // Kích thước trang
          current={currentPage} // Trang hiện tại
          onChange={handlePageChange} // Xử lý khi chuyển trang
        />
      </div>
    </>
  );
};

export default Topic;
