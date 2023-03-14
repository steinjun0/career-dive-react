import ReactGA from 'react-ga';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function BusinessRouteChangeTracker() {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);
  const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID; // 발급받은 추적ID를 환경 변수로 불러온다.
  ReactGA.initialize(TRACKING_ID!);

  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID!);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [initialized, location]);

  return null;
}