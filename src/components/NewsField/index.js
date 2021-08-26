import "./NewsField.css";
import { useCallback } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button, ListItem, List, ListItemText } from "@material-ui/core";

export const NewsField = ({ loading, error, onRequestNews, news }) => {
  const renderNews = useCallback(
    (n) => (
      <ListItem key={n.id} button>
        <a href={n.url} target="_blank" rel="noreferrer" className="news__link">
          <ListItemText primary={n.title} secondary={n.summary} />
        </a>
      </ListItem>
    ),
    []
  );

  if (loading) {
    return <CircularProgress size={"6rem"} data-testid="circul-element" />;
  }

  if (error) {
    return (
      <>
        <h2>Request error</h2>
        <Button variant="contained" color="primary" onClick={onRequestNews}>
          TRY AGAIN
        </Button>
      </>
    );
  }

  if (!news.length) {
    return <h2>No articles</h2>;
  }

  return <List>{news.map(renderNews)}</List>;
};
