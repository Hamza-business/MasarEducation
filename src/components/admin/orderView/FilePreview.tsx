import { FaDownload } from "react-icons/fa";
import { Button } from "../../ui/button";

type FileInfo = {
  name: string;
  mimetype: string;
  data: string;
};

export function FilePreview({ file }: { file: FileInfo }) {
  const src = `data:${file.mimetype};base64,${file.data}`;
  const isImage = file.mimetype.startsWith("image/");
  const isPDF = file.mimetype === "application/pdf";

  return (
    <div className="space-y-2">
      <div className="border rounded-sm overflow-hidden max-h-[600px]">
        {isImage ? (
          <img src={src} alt={file.name} className="w-full h-auto object-contain rounded-sm" />
        ) : isPDF ? (
          <iframe
            src={src}
            title={file.name}
            className="w-full min-h-[500px] border-none rounded-sm"
          />
        ) : (
          <p className="text-muted-foreground">Unsupported file type</p>
        )}
      </div>
      <a href={src} download={file.name}>
        <Button variant="outline" className="w-full sm:w-auto rounded-sm">
          <FaDownload /> Download {file.name}
        </Button>
      </a>
    </div>
  );
}
