import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { fetchMovieReviews } from "../../movies";
import css from './MovieReviews.module.css';
import { DNA } from "react-loader-spinner";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loaderActive, setLoaderActive] = useState(false);
  
  useEffect(() => {
    setLoaderActive(true)
    async function fetchData() {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (err) {
          console.log(err)
      } finally {
        setLoaderActive(false);
      }
    }
    fetchData();
  }, [movieId])

  const getNameInitials = name => name.split(' ').map(e => e[0]).join('');

  return (
    <>
      <DNA
        visible={loaderActive}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperClass="dna-wrapper"
      />
      {reviews.length ? <ul className={css.reviewsList}>
        {reviews.map(e =>
          <li key={e.id}>
            <div className={css.reviewerInfo}>
              {e.author_details.avatar_path ? <span><img src={'https://image.tmdb.org/t/p/w200/' + e.author_details.avatar_path} alt="Reviewer avatar" /></span> :
                <span className={css.customAvatar}>{getNameInitials(e.author)}</span>
              }
              <div>
                <p className={css.username}>{e.author}</p>
                <p>{e.author_details.username}</p>
              </div>
            </div>
            <p className={css.reviewTxt}>{e.content}</p>
          </li>
          )}
      </ul> : <p>We don&apos;t have any reviews yet...</p>}
    </>
  )
}