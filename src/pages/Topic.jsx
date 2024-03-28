import { useEffect, useState } from "react";
import axios from "axios";

import "../Components/Products/style.css";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const Topic = () => {
  const [topic, setTopic] = useState({
    data: null,
    isLoading: false,
  });



  useEffect(() => {
    (async () => {
      setTopic((prev) => ({ ...prev, isLoading: true }));
      const { data: _data } = await axios.get("http://103.30.10.141:3000/api/v1/topic/create");
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
     
      <div className="content">
        <section className="section-danhmuc">
          <div className="row">
            <div className="col- swiper-flex">
              <div className="col-xxl-2 col-lg-3 col-md-4 col-6">
                <div className="topic-box">
                <div className="topic-detail">
                  <div className="topic-img">
                     <img src="https://cdn.tuoitre.vn/zoom/720_450/471584752817336320/2024/3/10/top-1-1710022929526890109735-23-0-527-806-crop-1710022990307787102898.jpg" />
                     <h3><Link to="/challenges" title="Xem ngay"> Chủ Đề</Link></h3>
                     
                    </div>
                  </div>
                </div>
              </div>




              <div className="col-xxl-2 col-lg-3 col-md-4 col-6 ">
                <div className="topic-box">
                  <div className="topic-img">
                    <img src="https://xwatch.vn/upload_images/images/2023/05/22/cau-do-hai-nao-so-2.jpg" />
                    <div className="topic-detail">
                     
                      <h3><Link to="/challenges" title="Xem ngay"> Chủ Đề</Link></h3>
                     
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-2 col-lg-3 col-md-4 col-6 ">
                <div className="topic-box">
                  <div className="topic-img">
                    <img src="https://2.bp.blogspot.com/-G3nYpK1Gnlw/VI2BDS9g38I/AAAAAAAAiKk/DTPhZEDuKPM/s1600/cau-do-dan-gian.jpg" />
                    <div className="topic-detail">
                    <h3><Link to="/challenges" title="Xem ngay"> Chủ Đề</Link></h3>
                     
                    </div>
                  </div>
                </div>
              </div>
          
              <div className="col-xxl-2 col-lg-3 col-md-4 col-6 ">
                <div className="topic-box">
                  <div className="topic-img">
                    <img src="https://png.pngtree.com/thumb_back/fw800/background/20230903/pngtree-a-puzzle-board-with-flags-set-up-image_13191520.jpg" />
                    <div className="topic-detail">
                    <h3><Link to="/challenges" title="Xem ngay"> Chủ Đề</Link></h3>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>
     
     
    </>
  );
};

export default Topic;
