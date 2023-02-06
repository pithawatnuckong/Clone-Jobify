import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

const AllJobs = () => {
	const { getAllJobs, isLoading } = useAppContext();

	useEffect(() => {
		getAllJobs();
	}, []);

	return <div>
    {isLoading ? (
      <h1 style={{textTransform: 'capitalize'}}>loading</h1>
    ) : (
      <h1 style={{textTransform: 'capitalize'}}>success</h1>
    )}
  </div>;
};
export default AllJobs;
