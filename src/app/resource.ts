export interface IResource {
  id: string;
  displayName: string;
  url: string;
  next?: string;
  result?: any [];
  itemList?: any[];
  include?: boolean;
}
