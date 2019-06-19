import { ApolloClient } from 'apollo-boost';
import { NextContext } from 'next';

export interface IContext extends NextContext {
  apolloClient: ApolloClient<any>;
}

export interface IFile {
  name: string;
}

export interface IAdaptedAttachment {
  fileId: string;
  fileName: string;
  fileType: string;
  fullThumbUrl: string;
  largeThumbUrl: string;
  smallThumbUrl: string;
  url: string;
}
