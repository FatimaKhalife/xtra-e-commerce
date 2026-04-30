import "./detail.css";
import { useEffect, useState, type FormEvent } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { FaRegStar, FaStar } from "react-icons/fa";

interface Review {
  id: number;
  image: string;
  name: string;
  rating: number;
  review: string;
  date: string;
}

const Review: React.FC<{ productId: number }> = ({ productId }) => {
  const [num1, setNum1] = useState(() => Math.floor(Math.random() * 10));
  const [num2, setNum2] = useState(() => Math.floor(Math.random() * 10));
  const [reviews, setReviews] = useState<Review[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setsetImage] = useState(
    "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
  );
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [math, setmath] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/review/${productId}`).then((res) => {
      setReviews(res.data.reviews || res.data.data || res.data);
    });
  }, [productId]);

  const handlereview = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !name || !review) return alert("fill everything");

    if (parseInt(math) !== num1 + num2) {
      return alert("Math answer is incorrect.");
    }

    await axios.post(`${API_URL}/review/`, {
      productId,
      name,
      image,
      email,
      rating,
      review,
    });




    setName("");
    setEmail("");
    setRating(1);
    setReview("");


    const res = await axios.get(`${API_URL}/review/${productId}`);
    setReviews(res.data);
  };

  function Star({ rev }: { rev: any }) {
    return (
      <div>
        {[...Array(5)].map((_, i) =>
          i > rev.rating - 1 ? (
            <FaRegStar key={i} color="#e4e5e9" />
          ) : (
            <FaStar key={i} color="#ffc107" />
          )
        )}
      </div>
    );
  }

  function Starrating() {
    const [hover, setHover] = useState(0);
    return (
      <div className="star">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            onClick={() => setRating && setRating(i)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(rating)}
          >
            {hover < i ? (
              <FaRegStar color="#e4e5e9" />
            ) : (
              <FaStar color="#ffc107" />
            )}{" "}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="total-review">
      <h3>Additional information</h3>
      <hr />

      {reviews.map((rev, index) => (
        <div className="review" key={index}>
          <img src={rev.image} alt="" />
          <div className="review-comment">
            <div className="review-user">
              <div style={{ display: "flex", gap: "10px" }}>
                <h5>{rev.name}</h5>

                <p>
                  {new Date(rev.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div>
                <p>
                  <Star rev={rev} />
                </p>
              </div>
            </div>
            <p>{rev.review}</p>
          </div>
        </div>
      ))}

      <p>Add a review</p>
      <p>
        Your email address will not be published. Required fields are marked *
      </p>
      <p> Your rating *</p>

      <div>
        <Starrating />{" "}
      </div>
      <p>your review*</p>

      <form onSubmit={handlereview}>
        <textarea
          name="review"
          id=""
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <div className="review-form">
          <div>
            <p>Name</p>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <p>Email</p>

            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <p>
              {num1} + {num2}
            </p>

            <input
              type="text"
              value={math}
              onChange={(e) => setmath(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="details-addtocart"
          style={{
            border: "none",
            marginTop: "10px",
            width: "70px",
            height: "30px",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default Review;
