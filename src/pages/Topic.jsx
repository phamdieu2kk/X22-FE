import { useEffect, useState } from "react";
import axios from "axios";
import FooterList from "../Components/FooterList";
import "../Components/Products/style.css";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState({
    data: null,
    isLoading: false,
  });

  useEffect(() => {
    (async () => {
      setProducts((prev) => ({ ...prev, isLoading: true }));
      const { data: _data } = await axios.get("http://localhost:3000/products");
      setProducts(() => ({ data: _data, isLoading: false }));
    })();
  }, []);

  const { data } = products;

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
                <div className="outstanding-box">
                  <div className="outstanding-img">
                    <img src="https://cdn.tuoitre.vn/zoom/720_450/471584752817336320/2024/3/10/top-1-1710022929526890109735-23-0-527-806-crop-1710022990307787102898.jpg" />
                    <div className="outstanding-detail">
                      <h3>
                        Chủ Đề
                        <br></br>
                        <a href="/outstand" title="Xem ngay">
                          Xem ngay
                        </a>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-2 col-lg-3 col-md-4 col-6 ">
                <div className="outstanding-box">
                  <div className="outstanding-img">
                    <img src="https://xwatch.vn/upload_images/images/2023/05/22/cau-do-hai-nao-so-2.jpg" />
                    <div className="outstanding-detail">
                      <h3>
                        Chủ Đề
                        <br></br>
                        <a href="/outstand" title="Xem ngay">
                          Xem ngay
                        </a>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-2 col-lg-3 col-md-4 col-6 ">
                <div className="outstanding-box">
                  <div className="outstanding-img">
                    <img src="https://2.bp.blogspot.com/-G3nYpK1Gnlw/VI2BDS9g38I/AAAAAAAAiKk/DTPhZEDuKPM/s1600/cau-do-dan-gian.jpg" />
                    <div className="outstanding-detail">
                      <h3>
                        Chủ Đề
                        <br></br>
                        <a href="/challenges" title="Xem ngay">
                          Xem ngay
                        </a>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-2 col-lg-3 col-md-4 col-6 ">
                <div className="outstanding-box">
                  <div className="outstanding-img">
                    <img src="https://png.pngtree.com/thumb_back/fw800/background/20230903/pngtree-a-puzzle-board-with-flags-set-up-image_13191520.jpg" />
                    <div className="outstanding-detail">
                      <h3>
                        Chủ Đề
                        <br></br>
                        <a href="/challenges" title="Xem ngay">
                          Xem ngay
                        </a>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      <FooterList />
    </>
  );
};

export default Products;
