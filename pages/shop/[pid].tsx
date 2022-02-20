import { useRouter } from "next/router";
import { Text } from "vcc-ui";
import { useFakeFetchCar } from "../../src/hooks/client";

function Shop() {
  const router = useRouter();
  const { pid } = router.query;

  const fetchedCar = useFakeFetchCar(pid);

  switch (fetchedCar.status) {
    case "loading":
      return <Text>Loading...</Text>;

    case "success":
      return <Text>Shop page - Car id: {pid}</Text>;

    case "error":
      return (
        <Text>{`Failed showing car with error: ${fetchedCar.error.message}`}</Text>
      );

    default:
      return null;
  }
}

export default Shop;
