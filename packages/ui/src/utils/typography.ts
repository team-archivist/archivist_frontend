export const Typography = {
  Title1: {
    get ["20"](){
      const Default = {
          fontSize : "20px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "26px" /* 130% */,
          letterSpacing: "-0.24px",
        };
      return {
        Regular: {...Default },
        SemiBold: {...Default ,fontWeight : 500 }
      }
    }
  },
  Title2: {
    ["17"]: {
      Regular: {
        fontSize: "17px",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "24px" /* 141.176% */,
        letterSpacing: "-0.17px",
      },
    },
  },
  Body1 : {
    ["16"]: {
      Regular : {
        fontSize : "16px",
        fontStyle : "normal",
        fontWeight : 400,
        lineHeight : "26px",
        letterSpacing : "-0.1px",
      }
    }
  },
  Body2: {
    ["15"]: {
      Regular: {
        fontSize: "15px",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "24px" /* 160% */,
        letterSpacing: "0.15px",
      },
    },
  },
  Label2: {
    ["14"]: {
      Regular: {
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "20px",
        letterSpacing: "0.14px",
      }
    }
  },
  Caption1: {
    ["12"]: {
      Regular: {
        fontSize: "12px",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "16px" /* 133.333% */,
        letterSpacing: "0.288px",
      },
    },
  },
};
