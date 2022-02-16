import React from "react";
import { useFakeFetchCars } from "../src/hooks/client";

export default function Home() {
  const fetchedCars = useFakeFetchCars();

  switch (fetchedCars.status) {
    case "loading":
      return <div>Loading...</div>;

    case "success":
      return fetchedCars.data.map((c) => (
        <div key={c.id}>{`Car: ${c.id}`}</div>
      ));

    case "error":
      return (
        <p>{`Failed showing cars with error: ${fetchedCars.error.message}`}</p>
      );

    default:
      return null;
  }
}
