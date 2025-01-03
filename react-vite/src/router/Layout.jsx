import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as sessionActions from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation />
      {isLoaded && <Outlet />}
      <Footer />
    </>
  );
}
