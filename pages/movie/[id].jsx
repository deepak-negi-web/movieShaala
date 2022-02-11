import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";

import { Wrapper } from "./style";
import { Card, CastCard, CompanyCard, Loader } from "../../components";
import { ArrowLeft } from "../../assets";
export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovieDetails = useCallback(async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${parseInt(
        id
      )}?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    return data;
  }, [API_KEY, id]);

  const fetchMovieCredits = useCallback(async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${parseInt(
        id
      )}/credits?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    return data;
  }, [API_KEY, id]);

  useEffect(() => {
    // fetching the nowPlaying movies data from the API on component mount
    if (id) {
      (async () => {
        const movieDetails = await fetchMovieDetails();
        const movieCredits = await fetchMovieCredits();
        setMovie({ ...movieDetails, ...movieCredits }); // setting the movie details to the state
        setLoading(false); // setting the loading state to false
      })();
    }
  }, [fetchMovieDetails, fetchMovieCredits, id]);

  if (loading) return <Loader />;

  return (
    <Wrapper>
      <div className="heading">
        <span className="back_button" onClick={() => router.push("/")}>
          <ArrowLeft size="32" color="rgb(3, 37, 65)" />
        </span>
        <h1>{movie.title}</h1>
      </div>
      <div className="card_wrap">
        <Card movie={movie} layout="row" showfullDate={true} />
      </div>
      <section>
        <h1>Overview</h1>
        <p>{movie.overview}</p>
      </section>
      <section>
        <h1>Cast</h1>
        <div className="grid_view">
          {movie.cast.map((cast, index) => {
            return <CastCard key={cast.id} cast={cast} />;
          })}
        </div>
      </section>
      <section>
        <h1>Production Companies</h1>
        <div className="grid_view">
          {movie.production_companies.map((company, index) => {
            return <CompanyCard key={company.id} company={company} />;
          })}
        </div>
      </section>
    </Wrapper>
  );
}
