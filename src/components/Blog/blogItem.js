import React, { useState } from 'react'
import { GetPostComments } from '../../services/blogService';
import { GetPageInfo } from '../Pagination/paginationUtils';
import { toast } from 'react-toastify';
import { LoaderToggle } from '../Loader/loader';
import CommentList from './commentList';

export default function PostItem(props){
    const [showComment, setShowComment] = useState(false);
    const [comments, setComments] = useState([]);
    const [pageInfo, setPageInfo] = useState({pageSize:12, sorting:1});
    const [isLoading, setIsLoading] = useState(false);

    const emptyComments = [{},{}];

    const getComment = async(postId) => {
        LoaderToggle(true);
        setIsLoading(true);
        var res = await GetPostComments(postId);
        if(res.isSuccess){
            setComments(res.data.comments);
            setPageInfo(GetPageInfo(res.data.total, res.data.comments.length, 1, pageInfo.pageSize, pageInfo.sorting));
        }
        else{
            toast('Error: ' + res.data);
        }
        setIsLoading(false);
        LoaderToggle(false);
    }
    
    const handleShowCommentClick = async(postId) => {
        setShowComment(!showComment);
        if(!showComment){
            await getComment(postId);
        }
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
