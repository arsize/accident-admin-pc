export interface CustomRes {
  code: number
  msg?: string
  data?: LoginInfo & UserInfo & ServiceType[] & RelevantLaws[] & ContentMd
}

export interface LoginInfo {
  accessTokenExpire?: string
  access_token?: string
  refreshTokenExpire?: string
  refresh_token?: string
}

export interface UserInfo {
  email?: string
  firstName?: string
  gender?: number
  id: number
  mobile?: string
  orgId?: number
  realName?: string
  status?: number
  superAdmin?: number
  surname?: string
  transMap?: {}
  username?: string
}
export interface SlideItem {
  blogType?: number
  content?: string
  id: number
  legalKnowledgeType?: number
  pictureUrl?: string
  title?: string
}

export interface ServiceType {
  id?: number
  name?: string
  value?: number
}

export interface RelevantLaws {
  id: number
  legalKnowledgeType: number
  pictureUrl: string
  title: string
}

export interface ContentMd {
  content?: string
  summary?: string
  extendedArticles?: extendedArticlesList[]
}

export interface extendedArticlesList {
  id?: number
  title?: string
}
