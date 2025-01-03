import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as sessionActions from "../../redux/session";
import { getOrderedReviews } from "../../redux/review";
import ProfileButton from "../Navigation/ProfileButton";
import Footer from "../Footer";
import lan from "./LandingPage.module.css";
import { IoIosPaw } from "react-icons/io";
import DemoButton from "../Navigation/DemoButton";

function LandingPage() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.session.user);
  const ordered_reviews = useSelector((state) => state.review.reviews);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getOrderedReviews());
  }, [dispatch]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const pawRatingIcon = (
    <div className={lan.pawRatingIcon}>
      <IoIosPaw />
    </div>
  );

  return (
    <div className={lan.landingPageContainer}>
      <div className={lan.bannerContainer}>
        <img className={lan.logo} src="/images/logo-banner.jpg" alt="logo" />
        {currentUser &&
          (currentUser.position === "Owner" ||
            currentUser.position === "Manager") && (
            <div className={lan.adminButtonContainer}>
              <button className={lan.adminButton} onClick={toggleDropdown}>
                Admin
              </button>
              {isDropdownOpen && (
                <div className={lan.adminMenu}>
                  <button
                    onClick={() => navigate("/services")}
                    className={lan.manageServicesBtn}
                  >
                    Manage Services
                  </button>
                  <button
                    onClick={() => navigate("/users")}
                    className={lan.manageUsersBtn}
                  >
                    Manage Users
                  </button>
                  <button
                    onClick={() => navigate("/bookings")}
                    className={lan.manageBookingsBtn}
                  >
                    Manage Bookings
                  </button>
                </div>
              )}
            </div>
          )}
        <div className={lan.profileButton}>
          <ProfileButton />
        </div>
        {currentUser ? null : (
          <div className={lan.demoButton}>
            <DemoButton />
          </div>
        )}
      </div>
      <div className={lan.landingBodyContainer}>
        <div className={lan.messageContainer}>
          <img className={lan.pawLeft} src="/images/paw-left.png" alt="paw" />
          <h1 className={lan.messageBox}>
            YOUR PET&apos;S ULTIMATE VACATION AWAITS!
          </h1>
          <img className={lan.pawRight} src="/images/paw-right.png" alt="paw" />
        </div>
        <div className={lan.infoContainer}>
          <div className={lan.aboutContainer}>
            <div className={lan.aboutBox}>
              <h1 className={lan.aboutH1}>Welcome to Paradise!</h1>
              <p className={lan.aboutParagraph}>
                At Lovely Paws Hotel, we&apos;re dedicated to making every stay
                a paws-itively delightful experience for your furry family
                members. Our cozy, pet-friendly haven is designed to feel like a
                home away from home, filled with love, comfort, and plenty of
                tail-wagging fun. From pampering spa treatments to playtime
                galore, we go the extra mile to ensure your pets enjoy the
                ultimate care and relaxation.
              </p>
              <p className={lan.aboutParagraph}>
                Our team of passionate animal lovers is committed to treating
                each guest like family. We understand how much your pets mean to
                you, and we&apos;re here to provide them with a safe, nurturing
                environment where they can thrive while you&apos;re away. At
                Lovely Paws Hotel, love and happiness are always at the heart of
                everything we do!
              </p>
            </div>
          </div>
          <div className={lan.featuresBox}>
            <div className={lan.serveAndBookButtonsContainer}>
              <button
                className={lan.servicesBtn}
                onClick={() => navigate("/services")}
              >
                Browse Our Services
              </button>
              <img className={lan.catPic} src="/images/cat.png" alt="cat" />
              <img className={lan.dogPic} src="/images/dog.png" alt="dog" />
              <button
                className={lan.bookingsBtn}
                onClick={() => navigate("/pets")}
              >
                Book a Reservation
              </button>
            </div>
            <div className={lan.reviewsContainer}>
              <div className={lan.reviewsBox}>
                <h1 className={lan.topReviewsTitle}>Top Reviews</h1>
                {ordered_reviews.map((review) => (
                  <div key={review.id} className={lan.orderedReview}>
                    <div className={lan.reviewHead}>
                      <div className={lan.reviewPaws}>
                        {pawRatingIcon}
                        {review.paws}
                      </div>
                      <div className={lan.reviewUsername}>
                        {review.client_username}
                      </div>
                    </div>
                    <div className={lan.reviewText}>{review.review}</div>
                  </div>
                ))}
                <button
                  className={lan.reviewsBtn}
                  onClick={() => navigate("/reviews")}
                >
                  See All Reviews
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={lan.catTenContainer}>
          <img src="/images/cat-10.png" alt="cat" className={lan.catTenPic} />
        </div>
        <div className={lan.petOfMonthBox}>
          <div className={lan.petInfoSide}>
            <div className={lan.petInfoH1}>
              <h1 className={lan.petOfMonthHeader}>Pet of the Month</h1>
            </div>
            <hr />
            <h2>King</h2>
            <p>
              King was the best cat we have had the chance to take care of!
              Alexi give us 100%!!
            </p>
          </div>
          <div className={lan.petOfMonthImage}>
            <img src="/images/king.jpg" alt="king" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
