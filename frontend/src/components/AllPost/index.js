import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceGrinHearts, faSadCry } from "@fortawesome/free-solid-svg-icons";

export const timestampParser = (num) => {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let date = new Date(num).toLocaleDateString("fr-FR", options);

  return date.toString();
};

function Post() {
  const heart = <FontAwesomeIcon icon={faFaceGrinHearts} />;
  const disheart = <FontAwesomeIcon icon={faSadCry} />;

  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");
  let user = false;

  if (token) {
    user = true;
  }

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/post/`,
    })
      .then((result) => {
        setPosts(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //Fonction Like
  const like = (props) => async () => {
    await axios({
      method: "post",
      url: `http://localhost:5000/api/post/${props}/like`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        like: 1,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  //Fonction dislike
  const dislike = (props) => async () => {
    await axios({
      method: "post",
      url: `http://localhost:5000/api/post/${props}/like`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        like: -1,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="">
      {posts
        .slice(0)
        .reverse()
        .map((post) => {
          return (
            <div className="col-lg-9 mx-auto card mt-5 shadow" key={post._id}>
              <h3 className="card-header text-center bg-tertiary">{post.title}</h3>

              <div className="row g-0 m-2">
                <div className="col-md-12">
                  <p className="card-">{post.content}</p>
                </div>
                {post.imageUrl ? (
                  <div className="col-md-12">
                    <img
                      className="img-fluid rounded"
                      src={post.imageUrl}
                      alt={post.title}
                    />
                  </div>
                ) : null}
              </div>

              <div className="card-footer d-flex flex-row bg-secondary">
                <NavLink
                  className="btn btn-primary text-light my-auto"
                  to={`/post?id=${post._id}`}
                >
                  Voir la publication
                </NavLink>
                <p className="fst-italic text-light fs-6 m-auto">
                  {" "}
                  Publié par {post.pseudo}
                </p>
                <span className="fst-italic text-light fs-6 m-auto">
                  {timestampParser(Date.now())}
                </span>

                {user === true ? (
                  <>
                    <button
                      className="btn btn-tertiary me-2"
                      onClick={like(post._id)}
                    >
                      {post.likes} {heart}
                    </button>
                    <button
                      className="btn btn-tertiary"
                      onClick={dislike(post._id)}
                    >
                      {post.dislikes} {disheart}
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Post;
