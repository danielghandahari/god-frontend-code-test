import React from "react";
import Image from "next/image";
import NextLink from "next/link";
import { Flex, Text, Card, CardContent, Spacer, Link } from "vcc-ui";

import { useFakeFetchCars } from "../src/hooks/client";

export default function Home() {
  const fetchedCars = useFakeFetchCars();

  switch (fetchedCars.status) {
    case "loading":
      return <Text>Loading...</Text>;

    case "success":
      return (
        <Flex
          extend={{
            border: "solid red",
            flexDirection: "row",
            overflowX: "auto",
            gap: "1rem",
          }}
        >
          {fetchedCars.data.map((c) => (
            <div
              key={c.id}
              style={{
                border: "solid blue",
                minWidth: "25rem",
                maxWidth: "25rem",
              }}
            >
              <Card>
                <CardContent>
                  <Text extend={{ fontSize: "0.75rem" }}>{c.bodyType}</Text>
                  <Spacer />
                  <Text extend={{ fontWeight: "bold" }}>{c.modelName}</Text>
                  <Spacer />
                  <Text>{c.modelType}</Text>
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
          ))}
        </Flex>
      );

    case "error":
      return (
        <Text>{`Failed showing cars with error: ${fetchedCars.error.message}`}</Text>
      );

    default:
      return null;
  }
}
