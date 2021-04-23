import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { combinedState } from "constant/type";
import { idAction, dateAction, resetState } from "redux/reducers/newPost";
import { addPost } from "fb/API";
import styled from "styled-components";
import StyledWriteHeader from "containers/WriteHeader/WriteHeader.styled";
import StyledTextEditor from "containers/Editor/TextEditor.styled";
import StyledButton from "components/Button/Button.styled";
import {
  alertCancelWriterOpenAction,
  alertWritePostOpenAction,
} from "redux/reducers/openModal";

type writePageProps = {
  className?: string;
};

const WritePage = ({ className }: writePageProps) => {
  const newPost = useSelector((state: combinedState) => state.newPost);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(idAction());
    console.log(newPost);
  }, []);

  const onClickSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (newPost.title === "" || newPost.content === "") {
      dispatch(alertWritePostOpenAction);
    } else {
      dispatch(dateAction(new Date()));
      await addPost(newPost);
    }
  };

  const onClickCancel = () => {
    dispatch(alertCancelWriterOpenAction);
  };

  return (
    <section className={className}>
      <StyledWriteHeader className="" newPost={newPost} />
      <StyledTextEditor className="" />
      <div className="btn-group">
        <StyledButton
          width="150"
          height="30"
          className="write-cancel"
          children="CANCEL"
          type="button"
          onClick={onClickCancel}
        />
        <StyledButton
          width="150"
          height="30"
          className="write-submit"
          children="UPLOAD"
          type="button"
          onClick={onClickSubmit}
        />
      </div>
    </section>
  );
};

const StyledWritePage = styled(WritePage)`
  position: relative;
  background-color: #fff;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin: 0 auto;
  overflow-x: hidden;

  .btn-group {
    position: fixed;
    bottom: 15px;

    & > button {
      border-radius: 15px;
      border: 1px solid #ccc;
      margin: 0 10px;
    }
  }
`;

export default StyledWritePage;
