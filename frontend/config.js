import getConfig from "next/config"

const { publicRuntimeConfig } = getConfig()

export const API = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.API_DEV : publicRuntimeConfig.API_DEV
export const APP_NAME = publicRuntimeConfig.APP_NAME
export const DOMAIN = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.DOMAIN_PRODUCTION : publicRuntimeConfig.DOMAIN_DEVELOPMENT
export const FACEBOOK_APP_ID = publicRuntimeConfig.FACEBOOK_APP_ID
