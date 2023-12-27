/**
 * - Next 의 Home 컴포넌트입니다
 */
import {NextPage} from "next";
import useLogin from "../hooks/useLogin";
import {Flex} from "@radix-ui/themes";
import { LoginView } from "@archivist/ui";
import { useEffect , useState } from "react";

const Home = () => {
  const { onLoginClick} = useLogin();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (mounted && <LoginView />)
}

export default Home;