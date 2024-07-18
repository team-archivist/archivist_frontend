import { deletePreviousTokenInCookie } from "@arcave/utils/cookie";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  deletePreviousTokenInCookie({ req, res });

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

export default function SignOutPage() {
  return <div></div>;
}
