import React, { useEffect, useState } from 'react';
import { TextArea } from 'src/components/common/Textarea';
import { TextInput } from 'src/components/common/TextInput';
import { Button } from 'src/components/common/Button';
import { getToken } from '../../../utils/getToken';
import axios from 'axios';
import { paths } from '../../../utils/paths';
import { useRouter } from 'next/router';
import { PagesHeader } from '../../header/PagesHeader';

// TODO 他のファイルを踏襲したコンポーネントとする
export const PostAddUI = () => {
  const router = useRouter();
  const [token, setToken] = useState<string>('');
  const [inputPostTitle, setInputPostTitle] = useState<string>('');
  const [inputPostContent, setInputPostContent] = useState<string>('');

  const POST_ADD_URL = 'http://localhost:3010/controller/post/add.php';

  const postHandler = async () => {
    const params = new URLSearchParams();
    params.append('user_id', token);
    params.append('title', inputPostTitle);
    params.append('content', inputPostContent);

    try {
      const res = await axios.post(POST_ADD_URL, params);
      if (res && !res.data.err_code) {
        router.push(paths.top);
      } else {
        alert(res.data.message);
      }
    } catch (e) {
      alert(e);
    }
  };

  const validation = {
    checkPostTitle: () => inputPostTitle.length > 0,
    checkPostContent: () => inputPostContent.length > 0,
    canPost: () => {
      return validation.checkPostTitle() && validation.checkPostContent();
    },
  };

  useEffect(() => {
    const fetchToken = getToken();
    setToken(fetchToken);
  }, []);

  return (
    <>
      <PagesHeader title="新規投稿" onClick={() => router.back()} />

      <div className="w-7/12 mx-auto">
        <TextInput
          inputTitle="投稿タイトル"
          placeholder="投稿タイトルを入力"
          inputValue={inputPostTitle}
          required={false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputPostTitle(e.target.value);
          }}
        />

        <TextArea
          textAreaTitle="投稿内容"
          placeholder="投稿内容を入力"
          textAreaInput={inputPostContent}
          required={false}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setInputPostContent(e.target.value);
          }}
        />
        <Button title="投稿する" onClick={postHandler} disabled={!validation.canPost() ? true : false} />
      </div>
    </>
  );
};
