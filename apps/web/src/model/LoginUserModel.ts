/**
 * - 회원가입 관련 모델입니다
 */
export default class LoginUserModel {
  public nickname : string; // 닉네임
  public email : string | null;  // 이메일
  public categories : string[]; // 카테고리 리스트
  public userId : number | string | null; // 사용자 id
  public imgUrl : string; // 프로필 이미지 url
  public token : string | null; // jwt token

  constructor( { nickname , email , categories , userId , imgUrl , token } : unknown = {} ) {
    this.nickname = nickname || null;
    this.email = email || null;
    this.categories = categories || null;
    this.userId = userId || null;
    this.imgUrl = imgUrl || null;
    this.token = token || null;
  }
}