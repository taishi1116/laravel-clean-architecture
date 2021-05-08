import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PostCommentList } from './PostCommentList';
import { PostCommentInput } from './PostCommentInput';
import { Loading } from '../../common/Loading';
import { getToken } from '../../../utils/getToken';

export type PostCommentList = {
  name: string;
  comment: string;
  commentTime: string;
};

type PostDetail = {
  name: string;
  title: string;
  content: string;
};

export const PostDetail = () => {
  const FETCH_POST_DETAIL_URL = 'http://localhost:3010/controller/post/detail.php';
  const FETCH_COMMENT_URL = 'http://localhost:3010/controller/post/fetch_comment.php';
  const POST_COMMENT_URL = 'http://localhost:3010/controller/post/add_comment.php';

  const [postId, setPostId] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [inputComment, setInputComment] = useState<string>('');
  const [comments, setComments] = useState<PostCommentList[]>([]);
  const [postDetail, setPostDetail] = useState<PostDetail>({
    name: '',
    title: '',
    content: '',
  });

  const postHandler = async () => {
    if (!token) {
      return alert('ログインしていないためコメントすることができません。');
    }
    const params = new URLSearchParams();
    params.append('user_id', token);
    params.append('post_id', postId);
    params.append('comment', inputComment);
    try {
      const res = await axios.post(POST_COMMENT_URL, params);
      if (res && !res.data.err_code) {
        fetchComments();
        setInputComment('');
      } else {
        alert(res.data.message);
      }
    } catch (e) {
      alert(e);
    }
  };

  const fetchPostDetail = async () => {
    const params = new URLSearchParams();
    params.append('post_id', postId);
    try {
      const res = await axios.get(FETCH_POST_DETAIL_URL, { params });
      if (res && !res.data.err_code) {
        const resData: PostDetail = res.data;
        setPostDetail({
          name: resData.name,
          title: resData.title,
          content: resData.content,
        });
      } else {
        alert(res.data.message);
      }
    } catch (e) {
      alert(e);
    }
  };

  const fetchComments = async () => {
    try {
      const params = new URLSearchParams();
      params.append('post_id', postId);
      const res = await axios.get(FETCH_COMMENT_URL, { params });
      if (res && !res.data.err_code) {
        setComments(res.data);
        setLoading(false);
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    const urlPath = window.location.pathname;
    const pathPostId = urlPath.split('post/')[1];
    setPostId(pathPostId);

    const fetchToken = getToken();
    setToken(fetchToken);
  }, []);

  useEffect(() => {
    fetchComments();
    fetchPostDetail();
  }, [postId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="w-7/12 mx-auto mb-8">
        <div className={'w-full text-2xl font-bold border-b mb-2'}>{postDetail.title}</div>
        <div className={'mb-5'}>
          <div className={'text-bold  mb-5'}>{postDetail.name}</div>
        </div>
        <div>
          <p>{postDetail.content}</p>
        </div>
      </div>
      <PostCommentList comments={comments} />
      <PostCommentInput inputComment={inputComment} setInputComment={setInputComment} postHandler={postHandler} />
      <style jsx>{``}</style>
    </>
  );
};
