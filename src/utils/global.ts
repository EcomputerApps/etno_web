import Resizer from 'react-image-file-resizer'

export const urlBase: string = 'https://192.168.137.1:8080';

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