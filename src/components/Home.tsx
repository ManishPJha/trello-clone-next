import { Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";

const Home: NextPage<any> = (props) => {
  return (
    <div>
      <Heading as={'h2'}>
        <Link href={"/"} style={{ color: "#ff0000" }}>
          Home
        </Link>
      </Heading>
    </div>
  );
};

export default Home;
