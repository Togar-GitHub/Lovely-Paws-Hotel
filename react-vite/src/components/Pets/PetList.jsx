import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPets, fetchUserPets, fetchPetDetail } from "../../redux/pets";
import { useNavigate } from "react-router-dom";
import AddPetModal from "../PetModals/AddPetModal";
import styles from "./PetList.module.css";

const PetList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pets, status, error } = useSelector((state) => state.pets);
  const sessionUser = useSelector((state) => state.session.user);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (!sessionUser) {
      navigate("/");
    }
  }, [sessionUser, navigate]);

  useEffect(() => {
    if (sessionUser.staff) {
      dispatch(fetchAllPets());
    } else {
      dispatch(fetchUserPets());
    }
  }, [dispatch, sessionUser]);

  const isLoading = status === "loading";

  const handlePetClick = async (petId) => {
    try {
      await dispatch(fetchPetDetail(petId));
      navigate(`/pets/${petId}`);
    } catch (error) {
      console.error("Failed to fetch pet details:", error);
    }
  };

  const isValidUser =
    sessionUser?.staff === true || sessionUser?.staff === false;

  return (
    <div className={styles.mainPetPage}>
      <img src="/images/paw-bg-strip.png" alt="" className={styles.pawPicOne} />
      <img src="/images/paw-bg-strip.png" alt="" className={styles.pawPicTwo} />
      <h1 className={styles.h1}>Manage Pets</h1>
      {isValidUser ? (
        <div className={styles.petListContainer}>
          <div className={styles.addPetButtonContainer}>
            <button
              onClick={() => setShowAddModal(true)}
              className={styles.addButton}
            >
              Add Pet
            </button>
          </div>
          {isLoading && <div>Loading...</div>}
          {status === "failed" && <div>{error}</div>}
          {status === "succeeded" && pets.length === 0 && <div>No pets!</div>}
          <div
            className={`${
              pets.length === 1
                ? styles.singlePet
                : pets.length === 2
                ? styles.doublePet
                : styles.allPetCardsContainer
            }`}
          >
            {status === "succeeded" &&
              pets.map((pet) => (
                <div
                  key={pet.id}
                  onClick={() => handlePetClick(pet.id)}
                  className={styles.petCard}
                >
                  <div className={styles.petImageBox}>
                    <img
                      src={pet.preview_image}
                      alt={pet.name}
                      className={styles.petImage}
                    />
                  </div>
                  <div className={styles.petName}>{pet.name}</div>
                </div>
              ))}
          </div>
          {showAddModal && (
            <AddPetModal
              onClose={() => setShowAddModal(false)}
              navigate={navigate}
            />
          )}
        </div>
      ) : (
        <h1>Unauthorized</h1>
      )}
    </div>
  );
};

export default PetList;
