// Please update this type as same as with the data shape.
type File = { id: string; name: string };
type List = Array<{ id: string; name: string; files: Array<File> }>;
let sourceFile: File;
let destinationIndex: number;

export default function move(list: List, source: string, destination: string): List {
  // find file
  // eslint-disable-next-line array-callback-return
  list.map((item) => {
    if (item.id === source) throw new Error('You cannot move a folder');
    // eslint-disable-next-line array-callback-return
    item.files.map((file, index) => {
      if (file.id === source) {
        sourceFile = file; // file added to temp
        item.files.splice(index, 1); // file removed
      }
    });
  });

  // write file
  destinationIndex = list.findIndex((item) => item.id === destination);
  if (destinationIndex < 0) throw new Error('You cannot specify a file as the destination');
  if (list[destinationIndex].files.findIndex((item) => item.name === sourceFile.name) >= 0)
    throw new Error('A folder cannot have two file with the identical name');
  list[destinationIndex].files.push(sourceFile); // file added

  return list;
}
