/**
 * - 회원가입 관련 모델입니다
 */
export default class LoginUserModel {
  public nickname? : string; // 닉네임
  public email? : string;  // 이메일
  public categories? : string[]; // 카테고리 리스트
  public userId : number | string; // 사용자 id
  public imageUrl? : string; // 프로필 이미지 url
  public token? : string; // jwt token

  constructor( { nickname , email , categories , userid , imageUrl , token } : unknown = {} ) {
    this.nickname = nickname || null;
    this.email = email || null;
    this.categories = categories || null;
    this.userId = userid || null;
    this.imageUrl = imageUrl || null;
    this.token = token || null;
  }
}