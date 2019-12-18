import React from "react";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import StarRating from "./StarRating";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px"
  }
};

export default function CommentModal(props) {
  const [isOpen, setIsOpen] = useState(false);
  const currentUserRating = props.currentUserRating;
  const [userComment, setUserComment] = useState("");
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    checkCurrentUserRating();
  }, [isOpen]);

  const checkCurrentUserRating = () => {
    if (currentUserRating) {
      setUserComment(currentUserRating.comment);
      setUserRating(currentUserRating.rating);
    }
  };

  const handleNewRating = async () => {
    const url = `https://127.0.0.1:5000/product/${props.productId}/rating`;
    const data = {
      userComment,
      userRating
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "text/plain",
        Authorization: `Token ${sessionStorage.getItem("token")}`
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      props.getRating(props.productId);
      setIsOpen(false);
      return;
    }
    alert("Comment problem");
  };
  return (
    <div>
      <button className="ff-primary-btn" onClick={() => setIsOpen(true)}>
        Rate
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="my-account-session-header-left mb-3">
          <div className="my-account-session-header-title">Rate this product:</div>
          <div className="my-account-session-header-subtitle">
            Be responsible for your rating
          </div>
        </div>
        <form>
          <StarRating
            starsSelected={userRating}
            setStarSelected={setUserRating}
          />
          <textarea
            rows="3"
            className="mt-3 mb-3 col-12 col-md-12"
            value={userComment}
            onChange={e => setUserComment(e.target.value)}
          ></textarea>
        </form>
        <button className="ff-primary-btn" onClick={handleNewRating}>
          Confirm rating
        </button>
      </Modal>
    </div>
  );
}
