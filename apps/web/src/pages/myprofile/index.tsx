import ACSkeleton from "@arcave/components/common/Skeleton";
import MyPage from "@arcave/components/views/MyPage";
import useAPIUser from "@arcave/services/external/useAPIUser";

export default function MyProfile() {
  const { loginUser: user } = useAPIUser({ required: true });

  if (!user) {
    return <ACSkeleton count={1} />;
  }

  return <MyPage categories={[]} />;
}
