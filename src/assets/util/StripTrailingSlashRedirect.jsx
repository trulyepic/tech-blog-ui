import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const StripTrailingSlashRedirect = () => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname.length > 1 && pathname.endsWith("/")) {
      const newPath = pathname.slice(0, -1) + search;
      navigate(newPath, { replace: true });
    }
  }, [pathname, search, navigate]);
  return null;
};

export default StripTrailingSlashRedirect;
