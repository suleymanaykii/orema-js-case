// Please update this type as same as with the data shape.
type File = { id: string; name: string };
type List = Array<{ id: string; name: string; files: Array<File> }>;
let sourceFileData: File;
let destinationNumber: number;

export default function move(list: List, source: string, destination: string): List {
  // find file
  list.forEach((data) => {
    if (data.id === source) throw new Error('You cannot move a folder');
    data.files.forEach((fileData, index) => {
      if (fileData.id === source) {
        sourceFileData = fileData; // file add sourceFileData
        data.files.splice(index, 1); // File deleted
      }
    });
  });
  // write file
  destinationNumber = list.findIndex((item) => item.id === destination);
  if (destinationNumber < 0) throw new Error('You cannot specify a file as the destination');
  if (list[destinationNumber].files.findIndex((item) => item.name === sourceFileData.name) >= 0)
    throw new Error('Cannot have more than one folder named file');
  list[destinationNumber].files.push(sourceFileData); // file added
  return list;
}
