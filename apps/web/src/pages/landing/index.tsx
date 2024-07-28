import { NavigationBar } from "@arcave/components/NavigationBar";
import Button from "@arcave/components/common/Button/Button";
import useKakaoLogin from "@arcave/hooks/useKakaoLogin";
import LandingImage from "@arcave/images/landing.png";
import { Text } from "@radix-ui/themes";
import Image from "next/image";

/**
 * - Landing 페이지입니다
 */
const LandingPage = () => {
  const { onLogin } = useKakaoLogin();

  return (
    <>
      <NavigationBar />
      <div className="justify-center items-center bg-[#f6f6f4] xl:h-[calc(100vh-56px)] xl:space-x-[102px] xl:flex-row flex flex-col xl:space-y-0 space-y-8 xl:py-0 py-16">
        <div className="flex flex-col space-y-6 mx-4">
          <Text className="text-text-normal text-58">
            관심가는 순간 <br />
            조각조각 모음, <strong>아케이브</strong>
          </Text>
          <Text className="text-20 text-text-alternative">
            관심가는 페이지, 놓치지 말고 아케이브 하세요.
            <br />
            좋아하는것을 조각조각 모아 내 취향을 찾아보세요.
          </Text>
          <Button
            size="large"
            onClick={onLogin}
            className="px-6 py-3 self-start"
          >
            카카오톡 계정으로 시작하기
          </Button>
        </div>

        <div className="object-contain xl:w-[572px] xl:h-[630px] relative aspect-[572/630] w-full max-w-[480px] xl:max-w-none">
          <Image
            src={LandingImage}
            alt="landing"
            fill
            className=""
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
    </>
  );
};
export default LandingPage;
