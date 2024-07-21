import { mixpanel } from "@arcave/utils/mixpanel";
import { PropsWithChildren, useEffect } from "react";

/*
 * NOTE: 아래와 같이 활용하세요.
 * <MixpanelTracker name="Search Page">
 *   <Component />
 * </MixpanelTracker>
 */

const MixpanelTracker = ({
  name,
  data,
  children,
}: PropsWithChildren<{ name: string; data: any }>) => {
  useEffect(() => {
    mixpanel.track(name, data);
  }, []);

  return { children };
};

export default MixpanelTracker;
