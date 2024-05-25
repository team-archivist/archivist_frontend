/**
 * - 회원가입 관련 상수입니다
 */
const SIGNUP_CONSTANTS = {
  /** 닉네임 유효성 검증관련 */
  VALIDATE: {
    NICKNAME_MIN: {
      LEVEL: "warning",
      CLASS_NAME: "text-status-caution",
      MESSAGE: "닉네임은 2자 이상 입력해주세요",
    },
    NICKNAME_MAX: {
      LEVEL: "warning",
      CLASS_NAME: "text-status-caution",
      MESSAGE: "닉네임은 20자 이하로 입력해주세요",
    },
    NICKNAME_BLANK: {
      LEVEL: "warning",
      CLASS_NAME: "text-status-caution",
      MESSAGE: "닉네임은 띄어쓰기 없이 한글,영문,숫자만 가능해요",
    },
    NICKNAME_ALREADY: {
      LEVEL: "error",
      CLASS_NAME: "status-alert",
      MESSAGE: "이미 등록된 닉네임입니다",
    },
    NICKNAME_EMPTY: {
      LEVEL: "error",
      CLASS_NAME: "status-alert",
      MESSAGE: "닉네임을 입력해주세요",
    },
  },
};
export default SIGNUP_CONSTANTS;
