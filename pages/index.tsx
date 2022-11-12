import Welcome from "@/src/components/Welcome";
import { withAuth } from "@/src/hoc/withAuth";
import type { NextPage } from "next";

const HomePageWithAuth: NextPage = withAuth(Welcome);

export default HomePageWithAuth;
