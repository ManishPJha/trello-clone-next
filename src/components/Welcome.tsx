import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "@/src/slices/auth";

const Welcome = (props: any) => {
  const authState = useSelector(authSelector);

  useEffect(() => {
    console.log(`int ----`, props);
  }, [props]);

  return (
    <div>
      Welcome Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Voluptatem nemo ipsa consectetur rem quas provident deserunt ad incidunt
      saepe placeat sunt totam facilis, alias inventore magnam in quos a
      quisquam? Quaerat dignissimos non, hic expedita labore itaque autem
      possimus perspiciatis placeat iste exercitationem tempore ut ea sequi,
      sunt quas quia totam quod magnam. Possimus commodi magni debitis libero
      vero quas. Quas, tenetur ratione voluptates earum officiis sunt
      perferendis voluptatum error laboriosam sit, beatae exercitationem
      perspiciatis necessitatibus quod! Quasi neque aut vitae fugit itaque quas.
      Molestias maiores sint eos nemo aliquid. Rerum esse voluptates eaque sint,
      ipsum minus repudiandae recusandae voluptatem aliquid doloribus neque
      architecto expedita ut rem vero blanditiis hic debitis vitae ducimus
      pariatur eos sit adipisci eligendi optio. Deserunt.
    </div>
  );
};

export default Welcome;
