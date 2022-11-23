import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "@chakra-ui/react"

import { authSelector } from "@/src/slices/auth";

const Welcome = (props: any) => {
  const authState = useSelector(authSelector);

  useEffect(() => {
    console.log(`int ----`, props);
  }, [props]);

  return (
    <div>
     <Link href="/boards" color={'blue.400'}>Boards</Link>
    </div>
  );
};

export default Welcome;
