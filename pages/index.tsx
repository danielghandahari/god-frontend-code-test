import React, { useRef, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import {
  Flex,
  Text,
  Card,
  CardContent,
  Spacer,
  Link,
  useTheme,
  View,
} from "vcc-ui";
import Slider from "react-slick";

import { useFakeFetchCars } from "../src/hooks/client";
import ChevronCircled from "../src/icons/chevron-circled";
import useHorizontalScroll from "../src/hooks/useHorizontalScroll";
import { BodyType, Car, FilterOptions } from "../src/types";
import useWindowSize from "../src/hooks/useWindowSize";
import FilterBar from "../src/components/FilterBar";

export default function Home() {
  const fetchedCars = useFakeFetchCars();
  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  const { scrollLeft, scrollRight } = useHorizontalScroll(cardContainerRef);
  const { isMobile } = useWindowSize();
  const theme = useTheme();
  const [filterSelection, setFilterSelection] = useState<FilterOptions>("all");

  function renderCars(cars: Car[], filterSelection: FilterOptions) {
    return cars
      .filter(
        (c) => c.bodyType === filterSelection || filterSelection === "all"
      )
      .map((c) => (
        <div
          key={c.id}
          style={{
            minWidth: "25rem",
            maxWidth: "25rem",
          }}
        >
          <Card>
            <CardContent>
              <Text
                extend={{
                  color: theme.color.foreground.secondary,
                }}
              >
                {c.bodyType}
              </Text>

              <Flex
                extend={{
                  gap: isMobile ? "0" : "0.375rem",
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                <Text subStyle="emphasis">{c.modelName}</Text>
                <Text
                  extend={{
                    color: theme.color.foreground.secondary,
                  }}
                >
                  {c.modelType}
                </Text>
              </Flex>

              <Spacer />
              <Image
                alt="car image"
                src={c.imageUrl}
                width={1000}
                height={800}
              ></Image>
              <Flex
                extend={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: "2rem",
                }}
              >
                <NextLink href={`/learn/${c.id}`} passHref>
                  <Link arrow="right">LEARN</Link>
                </NextLink>
                <NextLink href={`/shop/${c.id}`} passHref>
                  <Link arrow="right">SHOP</Link>
                </NextLink>
              </Flex>
            </CardContent>
          </Card>
        </div>
      ));
  }

  switch (fetchedCars.status) {
    case "loading":
      return <Text>Loading...</Text>;

    case "success":
      return (
        <View>
          <FilterBar
            filterSelection={filterSelection}
            setFilterSelection={setFilterSelection}
          />
          {isMobile ? (
            <Slider dots={true}>
              {renderCars(fetchedCars.data, filterSelection)}
            </Slider>
          ) : (
            <>
              <Flex
                ref={cardContainerRef}
                extend={{
                  flexDirection: "row",
                  overflowX: "auto",
                  gap: "1.5rem",
                  padding: "2rem",
                  scrollBehavior: "smooth",
                }}
              >
                {renderCars(fetchedCars.data, filterSelection)}
              </Flex>
              <Flex
                extend={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "1rem",
                  gap: "0.5rem",
                }}
              >
                <ChevronCircled direction="left" onClick={scrollLeft} />
                <ChevronCircled direction="right" onClick={scrollRight} />
              </Flex>
            </>
          )}
        </View>
      );

    case "error":
      return (
        <Text>{`Failed showing cars with error: ${fetchedCars.error.message}`}</Text>
      );

    default:
      return null;
  }
}
