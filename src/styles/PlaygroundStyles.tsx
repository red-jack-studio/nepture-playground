import styled from "styled-components";
import { BorderColor, BorderRadius } from ".";

export const TextArea = styled.textarea`
  height: auto;
  max-height: 96px;
  min-width: calc(100% - 1rem - 10px);
  margin: 0.5rem auto;
  padding: 10px;
  border: 1px solid ${BorderColor};
  border-radius: ${BorderRadius};
  font-size: 12pt;
  line-height: 1.5;
  background: transparent;
  color: #fff;
  overflow: hidden;
  resize: none;
`;

export const ProcessingJsxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const UploadFileTextWrapper = styled.div`
  margin: 1rem auto;
  font-size: 12pt;
  font-weight: 400;
`;
