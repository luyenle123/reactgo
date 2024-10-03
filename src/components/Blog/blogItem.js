import React, { useState } from 'react'
import { GetPostCommentUrl } from '../../services/blogAPI';
import { GetPageInfo } from '../Pagination/paginationUtils';
import CommentList from './commentList';
import { useFetchData } from '../../services/useFetchData';

export default function PostItem(props){
    const [showComment, setShowComment] = useState(false);
    const pageData = {page:1, size: 12, sorting: 1};
    const emptyComments = [{},{}];

    const postId = showComment ? props.post.id: 0;
    const [data, isLoading, error] = useFetchData(GetPostCommentUrl(postId));
    const comments = data?.comments;
    const pageInfo = data ? GetPageInfo(data.total, comments?.length, pageData.page, pageData.size, pageData.sorting) : {total: 0, pageSize:12, sorting:1};

    if(error){
        console.log(error);
    }    
    
    const handleShowCommentClick = async(postId) => {
        setShowComment(!showComment);
    }

    const activecl = showComment ? 'active' : '';
    return(
        <>
            <div className={props.isEmpty ? 'blog-list-item empty-item' : 'blog-list-item'}>
                <div className='blog-item-header' onClick={() => handleShowCommentClick(props.post.id)}>
                    <span className='post-title'>{props.isEmpty ? 'A long black shadow slid across the pavement' : props.post.title}</span>   
                    <span className='reaction-count'>{props.isEmpty ? '123' : props.post.views} views</span>
                    <span className='reaction-count'>{props.isEmpty ? '32' : props.post.reactions?.likes} likes</span> 
                    <span className='reaction-count'>{props.isEmpty ? '23' : props.post.reactions?.dislikes} dislikes</span>

                    <span className= {'collap-expand-button ' + activecl}></span>
                    {props.isEmpty ? 
                        <div className='blog-item-tag-wrapper'>
                            <span className='tag-label'>tags:</span> <span className='tag-item'>tag1</span> <span className='tag-item'>tag2</span> <span className='tag-item'>tag3</span>
                        </div>                    
                    : 
                    <>
                        {props.post.tags && props.post.tags.length > 0 && 
                            <div className='blog-item-tag-wrapper'>
                                <span className='tag-label'>tags:</span> {props.post.tags.map((t, i) => (<span className='tag-item' key={i}>{t}</span>))}
                            </div>
                        }
                    </>}
                </div>

                {showComment && 
                    <>
                        <div className='blog-item-comment-wrapper'>
                            {isLoading ? 
                                <CommentList comments={emptyComments} total={pageInfo.total} isEmpty={true}/>
                            :
                                <CommentList comments={comments} total={pageInfo.total}/>
                            }
                        </div>                
                    </>}                
            </div>
        </>
    );
}
