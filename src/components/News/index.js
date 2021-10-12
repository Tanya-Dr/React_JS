import "./News.css";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NewsField } from "../NewsField";
import { getNews } from "../../store/news/actions";
import {
  selectNews,
  selectNewsError,
  selectNewsLoading,
} from "../../store/news/selector";

export const News = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectNewsLoading);
  const error = useSelector(selectNewsError);
  const news = useSelector(selectNews);

  const requestNews = useCallback(() => {
    dispatch(getNews());
  }, [dispatch]);

  useEffect(() => {
    requestNews();
  }, [requestNews]);

  return (
    <div className="App">
      <div className="App_openedChat home">
        <h2 className="App_openedChat__header">News</h2>
        <div className="news">
          <NewsField
            loading={loading}
            error={error}
            onRequestNews={requestNews}
            news={news}
          />
        </div>
      </div>
    </div>
  );
};
