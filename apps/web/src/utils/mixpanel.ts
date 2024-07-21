import mixpanelBrowser from "mixpanel-browser";

// Near entry of your product, init Mixpanel
mixpanelBrowser.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
});

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
