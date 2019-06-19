import * as filestack from 'filestack-js';

import { IAdaptedAttachment, IFile } from '@app/renderer/types';

const client = filestack.init('AHQP20sDmRoqgUoG1ZP8gz');

const getValue = (data: any) => {
  const { url, filename, mimetype, handle } = data;
  return {
    url,
    fileName: filename,
    fileType: mimetype,
    smallThumbUrl: `https://cdn.filestackcontent.com/output=format:png,density:15,compress:true/resize=height:36/${handle}`,
    largeThumbUrl: `https://cdn.filestackcontent.com/output=format:png,density:15,compress:true/resize=height:350/${handle}`,
    fullThumbUrl: `https://cdn.filestackcontent.com/output=format:png,density:15,compress:true/resize=height:350/${handle}`,
    fileId: handle,
  };
};

interface IUploadArgs {
  file: IFile;
  onProgress?: () => void;
  option: any;
  onSuccess: (cb: any) => void;
  onError: (err: any) => void;
}

export const upload = ({ file, onProgress, option, onSuccess, onError }: IUploadArgs) => {
  return client
    .upload(file, { onProgress }, option)
    .then((data) => onSuccess && onSuccess(getValue(data)))
    .catch((err) => onError(err));
};

// https://filestack.github.io/filestack-js/interfaces/pickeroptions.html
export const openPicker = () => {
  return new Promise<IAdaptedAttachment>((resolve, reject) => {
    const options = {
      container: 'root',
      accept: ['.pdf', 'image/jpeg', 'image'],
      onUploadDone: (res: any) => {
        const uploadedFile = res.filesUploaded[0];
        if (!uploadedFile) {
          reject({ message: 'Upload failed' });
          return;
        }
        resolve(getValue(uploadedFile));
      },
    };
    client.picker(options).open();
  });
};
