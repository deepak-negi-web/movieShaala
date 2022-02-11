import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: ${({ layout = "column" }) => layout};
  gap: ${({ layout = "column" }) => (layout === "column" ? "0" : "2rem")};
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
  &:hover {
    cursor: pointer;
  }
  .card__image {
    width: 100%;
    width: ${({ layout = "column" }) => (layout === "column" ? "100%" : "40%")};
    max-width: ${({ layout = "column" }) =>
      layout === "column" ? "100%" : "280px"};
    height: 300px;
    position: relative;
    @media (max-width: 768px) {
      width: 180px;
      height: 260px;
    }
  }
  .card__body {
    width: ${({ layout = "column" }) => (layout === "column" ? "100%" : "60%")};
    padding: 0.5rem 0;
  }
`;

export const StyledWrapper = styled(Wrapper)`
  flex-shrink: 0;
  width: 380px;
  height: 200px;
  border-radius: 10px;
  margin-left: 10px;
  background-image: url(${(props) => props.bg_img});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  &:hover {
    cursor: pointer;
  }
  .hoz_card__body {
    color: #fff;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0 0.5rem;
  }
`;

export const CastWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(277, 277, 277, 1);
  padding-bottom: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  @media (max-width: 768px) {
    flex-shrink: 0;
    width: 120px;
    padding-bottom: 0px;
    height: 100%;
  }
  .card__image {
    width: 100%;
    height: 180px;
    border-radius: 8px 8px 0 0;
    position: relative;
    img {
      border-radius: 8px 8px 0 0;
    }
    @media (max-width: 768px) {
      flex-shrink: 0;
      height: 120px;
    }
  }
  .card__body {
    padding: 0.5rem;
    .name {
      font-size: 1rem;
      font-weight: 500;
      margin: 0;
      word-wrap: break-word;
    }
    .character {
      font-size: 0.9rem;
      font-weight: 500;
      margin: 0;
      color: #1a1b1c;
      word-wrap: break-word;
    }
    .bold {
      font-weight: bold;
    }
  }
`;
