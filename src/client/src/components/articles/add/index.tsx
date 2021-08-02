import React from 'react';
import { TextArea } from 'src/components/common/Textarea';
import { TextInput } from 'src/components/common/TextInput';
import { Button } from 'src/components/common/Button';
import { PagesHeader } from '../../header/PagesHeader';
import { useArticleAdd, Validator } from 'src/hooks/articles/add';

type Props = {
  title: string;
  content: string;
  validator: Validator;
  handleChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeContent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  postNewArticle: () => Promise<void>;
};

export const ArticleAddContainer = () => {
  const { title, content, validator, handleChangeTitle, handleChangeContent, postNewArticle } = useArticleAdd();

  return (
    <ArticleAddUI
      title={title}
      content={content}
      validator={validator}
      handleChangeTitle={handleChangeTitle}
      handleChangeContent={handleChangeContent}
      postNewArticle={postNewArticle}
    />
  );
};

export const ArticleAddUI: React.FC<Props> = ({
  title,
  content,
  validator,
  handleChangeTitle,
  handleChangeContent,
  postNewArticle,
}) => {
  return (
    <>
      <PagesHeader title="新規投稿" />

      <div className="w-7/12 mx-auto">
        <TextInput
          inputTitle="投稿タイトル"
          placeholder="投稿タイトルを入力"
          inputValue={title}
          required={false}
          onChange={handleChangeTitle}
        />

        <TextArea
          textAreaTitle="投稿内容"
          placeholder="投稿内容を入力"
          textAreaInput={content}
          required={false}
          onChange={handleChangeContent}
        />
        <Button title="投稿する" onClick={postNewArticle} disabled={!validator.canPostArticle} />
      </div>
    </>
  );
};
