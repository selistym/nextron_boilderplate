export interface IAttachment {
  name: string;
  url: string;
}

export interface IReference {
  id: string;
  visibleName: Array<{
    value: string;
  }>;
}

export interface ISelect {
  id: string;
  name: string;
  color: string;
}

export interface IDateTimeTypeOptions {
  dateFormat: string;
  includeTime: boolean;
  timeFormat: string;
  useGMT: boolean;
}
