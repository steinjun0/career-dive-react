import { SxProps } from "@mui/material";
import UploadIcon from "assets/icon/UploadIcon";
import React from "react";
import Dropzone, { FileWithPath } from "react-dropzone";
import { Flex, TextBody2, VerticalFlex, colorBackgroundGrayLight, colorCareerDivePink, colorTextLight } from "util/styledComponent";

function FileInputBox({ onDrop, onDelete, files, maxFileNumber = Infinity, sx }: { onDrop: (acceptedFiles: FileWithPath[]) => void, onDelete: (deleteFile: FileWithPath) => void, files: FileWithPath[], maxFileNumber?: number, sx?: SxProps; }) {
  return <VerticalFlex sx={{ width: '100%', height: '100%' }}>
    <Dropzone
      onDrop={(files) => {
        if (maxFileNumber < files.length) {
          alert(`파일은 ${maxFileNumber}개 이하로 첨부할 수 있습니다.`);
          return;
        }
        onDrop(files);
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <Flex
          sx={{
            backgroundColor: colorBackgroundGrayLight,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px',
            ...sx,
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <Flex sx={{ '&>svg': { width: '28px', height: '28px' } }}>
            <UploadIcon color={colorTextLight} />
          </Flex>
        </Flex>
      )}
    </Dropzone>
    {files && files.map((item, index) => {
      console.log('files', files);
      return <Flex key={index}>
        <TextBody2 color={colorTextLight} style={{ textDecoration: 'underline', marginRight: 10 }}>{item.path}</TextBody2>
        <TextBody2
          style={{ cursor: 'pointer' }}
          color={colorCareerDivePink}
          onClick={() => {
            onDelete(item);
          }}>삭제</TextBody2>
      </Flex>;
    })}
  </VerticalFlex>;
}

const MemoizedFileInputBox = React.memo(FileInputBox, (prevProps, nextProps) => {
  return prevProps.files.map((e) => e.path).join('') === nextProps.files.map((e) => e.path).join('');
});
export default MemoizedFileInputBox;