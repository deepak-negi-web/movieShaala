import React from "react";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";

import { Wrapper, StyledWrapper, CastWrapper } from "./style";
import { getFullYear, getLanguage, getFullDate } from "../../utils";

export function Card({ movie, showfullDate = false, ...rest }) {
  return (
    <Wrapper {...rest}>
      <div className="card__image">
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          layout="fill"
        />
      </div>
      <div className="card__body">
        <h3>{movie.title}</h3>
        <Rating
          ratingValue={movie.vote_average * 10}
          readonly={true}
          allowHalfIcon={true}
          size={20}
          showTooltip={true}
        />
        <p>{getLanguage(movie.original_language)}</p>
        <p>
          {showfullDate
            ? getFullDate(movie.release_date)
            : getFullYear(movie.release_date)}
        </p>
      </div>
    </Wrapper>
  );
}

export function HorizontalCard({ movie, ...rest }) {
  return (
    <StyledWrapper
      bg_img={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
      {...rest}
    >
      <div className="hoz_card__body">
        <Rating
          ratingValue={movie.vote_average * 10}
          readonly={true}
          allowHalfIcon={true}
          size={20}
        />
        <h3>
          {movie.title}({getFullYear(movie.release_date)}{" "}
          {getLanguage(movie.original_language)})
        </h3>
      </div>
    </StyledWrapper>
  );
}

export function CastCard({ cast }) {
  return (
    <CastWrapper>
      <div className="card__image">
        <Image
          src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
          alt={cast.name}
          layout="fill"
        />
      </div>
      <div className="card__body">
        <h3 className="name bold">{cast.name}</h3>
        <h4 className="character">{cast.character}</h4>
      </div>
    </CastWrapper>
  );
}
export function CompanyCard({ company }) {
  return (
    <CastWrapper>
      <div className="card__image">
        <Image
          src={`https://image.tmdb.org/t/p/w500/${company.logo_path}`}
          alt={company.name}
          layout="fill"
        />
      </div>
      <div className="card__body">
        <h3 className="name bold">{company.name}</h3>
      </div>
    </CastWrapper>
  );
}
