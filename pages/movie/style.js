import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 1rem;
  width: 70%;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
  }
  .heading {
    display: flex;
    align-items: center;
    margin: 0 0 2rem 0;
    .back_button {
      width: 32px;
      height: 32px;
      cursor: pointer;
      margin-right: 1rem;
      &:hover {
        border-radius: 50%;
        background: #f3f3f3;
      }
    }
    h1 {
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0;
    }
  }
  .card_wrap {
    width: 100%;
    height: 320px;
    background-image: url(${(props) => props.bg_img});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    @media (max-width: 768px) {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }
  .grid_view {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    grid-gap: 1rem;
    @media (max-width: 768px) {
      padding: 1rem 0;
      display: flex;
      overflow-x: scroll;
      width: 100%;
    }
  }
`;
