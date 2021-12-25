const _validFileExtensions = ["jpg", "jpeg", "png"];
const maxFileSize = 2000000;

export default function ValidateFile(file) {
  try {
    if (!file) return false;
    const fileExtension = file.name.split(".")[1];
    if (_validFileExtensions.indexOf(fileExtension) < 0) return false;
    if (file.szie > maxFileSize) return false;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
