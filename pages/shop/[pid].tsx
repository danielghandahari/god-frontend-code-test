import { useRouter } from "next/router";
import { useFakeFetchCar } from "../../src/hooks/client";

function Shop() {
  const router = useRouter();
  const { pid } = router.query;

  const fetchedCar = useFakeFetchCar(pid);

  switch (fetchedCar.status) {
    case "loading":
      return <div>Loading...</div>;

    case "success":
      return <p>Shop - Car id: {pid}</p>;

    case "error":
      return (
        <p>{`Failed showing car with error: ${fetchedCar.error.message}`}</p>
      );

    default:
      return null;
  }
}

export default Shop;