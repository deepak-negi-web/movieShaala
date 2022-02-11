import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";

import { Card, HorizontalCard } from "../components";

export default function Home() {
  const router = useRouter();
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState({
    popular: [],
    now_playing: [],
  });
  const loader = useRef(null);

  const fetchPopularMovies = useCallback(async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    const data = await response.json();
    return data.results;
  }, [API_KEY, page]);

  const fetchNowPlayingMovies = useCallback(async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    return data.results;
  }, [API_KEY]);

  // here we handle what happens when user scrolls to Load More movies
  // in this case we just update page variable
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };

  const onCardClickHandler = useCallback(
    (movie) => {
      console.log(movie);
      router.push("/movie/[id]", `/movie/${movie.id}`);
    },
    [router]
  );

  // initialize IntersectionObserver
  // and attaching it to Load More movies
  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  useEffect(() => {
    // fetching the nowPlaying movies data from the API on component mount
    (async () => {
      const nowPlayingMovies = await fetchNowPlayingMovies();
      setMovies((prev) => ({
        ...prev,
        now_playing: nowPlayingMovies,
      })); // setting the movies data to the state
    })();
  }, [fetchNowPlayingMovies]);

  useEffect(() => {
    // fetching the popular movies data from the API on component mount and on page change
    (async () => {
      const popularMovies = await fetchPopularMovies();
      setMovies((prev) => ({
        ...prev,
        popular: [...prev.popular, ...popularMovies],
      })); // setting the movies data to the state
    })();
  }, [fetchPopularMovies]);

  return (
    <Wrapper>
      <div className="horizontal_grid">
        {
          // rendering the movies data
          movies.now_playing.length > 0 &&
            movies.now_playing.map((movie) => {
              return (
                <HorizontalCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => onCardClickHandler(movie)}
                />
              );
            })
        }
      </div>

      <h1 className="head_title">Popular Movies</h1>
      <div className="grid_view">
        {
          // rendering the movies data
          movies.popular.length > 0 &&
            movies.popular.map((movie) => {
              return (
                <Card
                  key={movie.id}
                  movie={movie}
                  onClick={() => onCardClickHandler(movie)}
                />
              );
            })
        }
      </div>
      {/* Add Ref to Load More div  */}
      <div className="loading" ref={loader}>
        <h2>Load More</h2>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 1rem;
  width: 70%;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
  }
  .head_title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .horizontal_grid {
    padding: 1rem 0;
    display: flex;
    overflow-x: scroll;
    width: 100%;
    margin-bottom: 4rem;
  }
  .grid_view {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    grid-gap: 1rem;
    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      justify-items: center;
    }
  }
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
