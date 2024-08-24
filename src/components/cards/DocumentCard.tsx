import { useEffect, useState } from "react";
import { AiOutlineDownload, AiOutlineShareAlt } from "react-icons/ai";
import { GenericObject } from "../../interfaces";
import { isPromise } from "../../utils/utilities";

interface DocumentCardProps {
  name: string;
  item?: GenericObject;
  file?: File | null | Promise<File | null>;
  onClick?: () => void;
}

// const createThumb = async (
//   pdfUrl: string,
//   successCallback = (result?: any) => {}
// ) => {
//   const response = await PdfThumbnail(pdfUrl, {
//     // thumb image config
//     fileName: "mythumbimage.png", // thumb file name
//     height: 200, // image height
//     width: 200, // image width
//     pageNo: 1, // pdf page number
//   });

//   successCallback(response);

//   return response;
// };

const DocumentCard: React.FC<DocumentCardProps> = ({
  name,
  file,
  item = {},
  onClick = () => {},
  ...rest
}) => {
  const [fileName, setFileName] = useState(name);
  // console.log(item);
  // const [viewImage, setViewImage] = useState(null);

  useEffect(() => {
    if (file && isPromise(file)) {
      (async () => {
        const dataFile = await file;
        if (dataFile) {
          setFileName(dataFile.name);
          // setFileSize(dataFile.size);
        }
      })();
    }
  }, [file]);

  const getPreviewImage = (item: GenericObject) => {
    switch (true) {
      case !item?.url || item?.type === "application/pdf":
        return (
          <img
            src={require("../../assets/PDFIcon.svg").default}
            alt={item?.name || "File"}
            style={{
              objectFit: "contain",
            }}
          />
        );

      case item?.type === "image/*":
        return (
          <img
            src={item?.url}
            alt={item?.name || "File"}
            style={{
              objectFit: "contain",
              width: "100%",
              maxHeight: "100%",
            }}
          />
        );

      default:
        return (
          <img
            src={require("../../assets/unknownFileType.svg").default}
            alt={item?.name || "File"}
            style={{
              objectFit: "contain",
              // width: "50%",
              height: "100px",
            }}
          />
        );
    }
  };

  return (
    <div
      className="flex flex-col document-card px-5 pb-4 pt-2 border m-2 w-full sm:w-[24%]"
      style={{
        borderRadius: "8px",
        minWidth: "245px",
        maxWidth: "400px",
        flexGrow: 1,
        // transition: "all 0.5s ease",
      }}
      {...rest}
    >
      <div
        title="Click to preview attachment"
        className="flex flex-col items-center justify-center border-b mb-3 py-2"
        onClick={onClick}
        style={{
          width: "100%",
          height: "202px",
        }}
      >
        {getPreviewImage(item)}
      </div>
      <div
        className="flex justify-between items-center"
        style={{
          height: "30px",
        }}
      >
        <h4
          className="fw-700 capitalize"
          style={{
            fontSize: "14px",
          }}
        >
          {fileName?.replace(/_+/gi, " ")}
        </h4>
        <div
          className="flex flex-row items-center attachment-controls"
          // "& .attachment-controls": {
          //   display: "none",
          // },
          // "&:hover .attachment-controls": {
          //   display: "flex",
          //   // backgroundColor: "red"
          // },
        >
          <a href={item?.url} target="_blank" rel="noreferrer" download>
            <button className="flex flex-row items-center justify-center p-1 rounded-full w-[25px] h-[25px]" title="Download Attachment">
              <AiOutlineDownload />
            </button>
          </a>

          <button className="flex flex-row items-center justify-center p-1 rounded-full w-[25px] h-[25px]" title="Share Attachment" disabled>
            <AiOutlineShareAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
