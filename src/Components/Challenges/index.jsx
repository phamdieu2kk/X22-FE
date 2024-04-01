import React from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, Card, Button, Modal } from "antd";
import api from "../../api";

const Challenges = () => {
  const [challenges, setChallenges] = React.useState([]);
  const [selectedChallenge, setSelectedChallenge] = React.useState(null);
  const params = useParams();

  React.useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await api.getChallenges.invoke({
          params: {
            topicId: params.topicId,
          },
        });

        setChallenges(response.data.challenges);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };
    fetchChallenges();
  }, [params.topicId]);

  const handleShowDetail = (challenge) => {
    setSelectedChallenge(challenge);
  };

  const handleCloseDetail = () => {
    setSelectedChallenge(null);
  };

  return (
    <div>
      <div className="title-home">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Thử thách</Breadcrumb.Item>
        </Breadcrumb>
        <h2>CHỌN THỬ THÁCH</h2>
      </div>
      <div className="row">
        {challenges.map((challenge) => (
          <div key={challenge._id} className="col-md-3 mb-3">
            <Card
              hoverable
              cover={
                <img
                  alt="challenge"
                  src={challenge.img ?? "https://via.placeholder.com/300"}
                />
              }
            >
              <Card.Meta
                title={challenge.challengeName}
                description={`Level: ${challenge.level} - Point: ${challenge.point}`}
              />
              <Button onClick={() => handleShowDetail(challenge)}>
                View Detail
              </Button>
            </Card>
          </div>
        ))}
      </div>
      <Modal
        title={selectedChallenge?.challengeName}
        visible={!!selectedChallenge}
        onCancel={handleCloseDetail}
        footer={null}
      >
        <p>Level: {selectedChallenge?.level}</p>
        <p>Point: {selectedChallenge?.point}</p>
        {/* Display other details */}
      </Modal>
    </div>
  );
};

export default Challenges;