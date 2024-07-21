import mixpanelBrowser from "mixpanel-browser";

const mixpanelActions = {
  identify: (id: any) => {
    mixpanelBrowser.identify(id);
  },
  alias: (id: any) => {
    mixpanelBrowser.alias(id);
  },
  track: (name: any, props: any) => {
    mixpanelBrowser.track(name, props);
  },
  people: {
    set: (props: any) => {
      mixpanelBrowser.people.set(props);
    },
  },
};

export { mixpanelActions as mixpanel };
