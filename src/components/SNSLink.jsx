import styled from "styled-components";

const SNSBox = styled.div`
  width: 100%;
  display: flex;
  margin: auto;
  margin-bottom: 5px;
  align-items: center;

  .img-box{
    width: 100%;
  }
  .sns-img {
    width: 100%;
    height: 48px;
    cursor: pointer;
  }
`;

function SNSLink({ img, back, title, onClick }) {
  return (
    <SNSBox back={back}>
      <div className="img-box">
        <img className="sns-img" src={img} alt="..." onClick={onClick} />
      </div>
    </SNSBox>
  )
}

export default SNSLink;