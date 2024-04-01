import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const Ranks = () => {
  const [ranks, setRanks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("");
        // Sắp xếp danh sách người chơi theo số điểm từ cao đến thấp
        const sortedRanks = response.data.sort((a, b) => b.score - a.score);
        // Chọn ra 10 người chơi có số điểm cao nhất
        const topTen = sortedRanks.slice(0, 10);
        setRanks(topTen);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching ranks:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
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
      <h2 className="title-instruction">
        BẢNG VÀNG QUỐC GIA
      </h2>
      <div className="pt-2 text-right">
        <select className="rounded border-2 border-slate-300 px-4 py-1 outline-none">
          <option value="" selected="">
            Chọn top
          </option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      {/* Hiển thị thông tin của top 10 người chơi */}
      {/* <div className="rank-list">
        {ranks.map((player, index) => (
          <div key={index} className="player-info">
            <span>{index + 1}</span>
            <span>{player.name}</span>
            <span>{player.score}</span>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Ranks;