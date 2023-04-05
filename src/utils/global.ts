import Resizer from 'react-image-file-resizer'

export const urlBase: string = 'https://etnoapp2-42ec3.lm.r.appspot.com/';

export const resizeFile = (file: File) => new Promise<any>((resolve) => {
    Resizer.imageFileResizer(
      file,
      800,
      600,
      "png",
      1,
      0,
      (uri) => {
        resolve(uri)
      },
      "file",
      200,
      200
    );
  })