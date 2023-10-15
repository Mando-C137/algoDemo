import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const INDEX = (props: Props) => {
  redirect("/sort");
};

export default INDEX;
