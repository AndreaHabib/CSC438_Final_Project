import { Fragment } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const List = ({ list, title, type }) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Typography
        textAlign="center"
        variant="h6"
        component="div"
        sx={{
          width: "30%",
          borderRadius: "20px",
          p: 1,
          margin: "0 auto",
          backgroundColor: "primary.light",
          color: "white",
        }}
      >
        {title}
      </Typography>
      <Box sx={{ width: "100%", display: "flex", overflowX: "scroll" }}>
        {list.map((item) => (
          <Box
            key={item.id}
            sx={{
              width: "100%",
              m: 2,
              p: 1,
              borderRadius: "20px",
              backgroundColor: "white",
              "&:hover": {
                cursor: "pointer",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
              },
            }}
            onClick={() => {
              navigate(`/${type}/${item.id}`);
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
              alt={item.title}
              style={{
                borderRadius: "20px",
                width: "200px",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        ))}
      </Box>
    </Fragment>
  );
};

export default List;
