export enum LayoutType {
  Splash = 'splash',
  Guest = 'guest',
  Restricted = 'restricted',
  Empty = 'empty',
  Maintenance = 'maintenance',
}

export enum ThemeStyle {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum ThemeMode {
  SYSTEM = 'system',
  LIGHT = 'light',
  DARK = 'dark',
}

export enum QueryParams {
  PROJECT_ID = 'projectId',
  ADVERTISER_ID = 'advertiserId',
} 


export enum ProjectPermissions {
  NONE = 0,

  // Every permission (all bits to 1)
  EVERYTHING = -1,
}