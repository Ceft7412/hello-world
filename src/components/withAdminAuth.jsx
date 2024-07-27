import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const withAdminAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const { user, role } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (user && role !== "admin") {
        router.push("/");
      } else {
        setLoading(false);
      }
    }, [user, role, router]);

    if (loading) {
      return <Loader />; // or return <LoadingSpinner /> if you have a loading component
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;
