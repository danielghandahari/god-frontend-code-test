import { useEffect, useState } from "react";
import carData from "../../public/api/cars.json";
import { Car } from "../types";

const cars = carData as unknown as Car[];
const FAKE_LOADING_TIME = 3000;

type FetchResult<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

export function useFakeFetchCar(
  carId: string | string[] | undefined
): FetchResult<Car> {
  const [fetchResultState, setFetchResultState] = useState<FetchResult<Car>>({
    status: "loading",
  });

  useEffect(() => {
    setTimeout(() => {
      const car = cars.find((c) => carId === c.id);

      if (!car) {
        setFetchResultState({
          status: "error",
          error: new Error(`Invalid car id: ${carId}`),
        });
      } else {
        setFetchResultState({ status: "success", data: car });
      }
    }, FAKE_LOADING_TIME);
  }, [carId]);

  return fetchResultState;
}

export function useFakeFetchCars(): FetchResult<Car[]> {
  const [fetchResultState, setFetchResultState] = useState<FetchResult<Car[]>>({
    status: "loading",
  });

  useEffect(() => {
    setTimeout(() => {
      setFetchResultState({
        status: "success",
        data: cars,
      });
    }, FAKE_LOADING_TIME);
  }, []);

  return fetchResultState;
}
