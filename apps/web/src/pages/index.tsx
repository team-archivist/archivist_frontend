import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  // TODO: 로그인 여부 체크하기
  return {
    redirect: {
      destination: "/landing",
      permanent: false,
    },
  };
};

const Home = () => {
  return <div></div>;
};

export default Home;
