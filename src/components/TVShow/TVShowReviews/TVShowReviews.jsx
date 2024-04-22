import { useDispatch, useSelector } from "react-redux";
import { fetchShowReviews } from "../../../redux/currentShow/operations";
import { selectReviews } from "../../../redux/currentShow/selectors";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import css from './TVShowReviews.module.css';

export default function MovieReviews() {
  const { showId } = useParams();
  const dispatch = useDispatch();
  const reviews = useSelector(selectReviews); 
  
  useEffect(() => {
    showId && dispatch(fetchShowReviews(showId));
  }, [showId, dispatch])

  const getNameInitials = name => name.split(' ').map(e => e[0]).join('');

  return (
    <>
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