
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";



const Ranks = () => {
  
   const [ranks, setRanks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("YOUR_API_ENDPOINT");
          setRanks(response.data);
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
         <h2 className="title-instruction">
          BẢNG VÀNG QUỐC GIA
        </h2>
        <div className="pt-2 text-right">
          <select className="rounded border-2 border-slate-300 px-4 py-1 outline-none">
            <option value="" selected="">
              Chọn khối
            </option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <table className="table-gold mx-auto mt-4 w-full max-w-[800px] font-SVN-Merge text-xs xl:text-base">
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6">Loading...</td>
              </tr>
            ) : (
              ranks.map((rank, index) => (
                <tr key={index} className={`rank-${index + 1}`}>
                  <td>
                    <div className="relative h-7 w-7">
                      <div className="absolute inset-0 flex h-full w-full items-center justify-center font-SVN-Merge font-bold text-red-600">
                        {index + 1}
                      </div>
                    </div>
                  </td>
                  <td>{rank.name}</td>
                  <td>{rank.grade}</td>
                  <td>{rank.school}</td>
                  <td>{rank.district}</td>
                  <td>{rank.province}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  };

export default Ranks;
