import { api } from "http/api";
import { IFile } from "models/File";

class FileService {
  async save(file: File): Promise<IFile> {
    const res = await api.post(
      "/files",
      { file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  }

  async getAll(): Promise<IFile[]> {
    const res = await api.get("/files");
    return res.data;
  }
}

const fileService = new FileService();

export default fileService;
