/**
 * - 회원가입 관련 모델입니다
 */
export default class SignupModel {
  public nickname : string; // 닉네임
  public email : string;  // 이메일
  public categories : string[]; // 카테고리 리스트

  constructor( { nickname , email , categories } : unknown = {} ) {
    this.nickname = nickname || '';
    this.email = email || '';
    this.categories = categories || '';
  }

}