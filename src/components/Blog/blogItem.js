import React, { useState } from 'react'
import { GetPostComments } from '../../services/blogService';
import { GetPageInfo } from '../Pagination/paginationUtils';
import { toast } from 'react-toastify';
import { LoaderToggle } from '../Loader/loader';

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
            <div className='blog-list-item'>
                <div className='blog-item-header' onClick={() => handleShowCommentClick(props.post.id)}>
                    <span className='post-title'>{props.post.title}</span>   
                    <span className='reaction-count'>{props.post.views} views</span>
                    <span className='reaction-count'>{props.post.reactions?.likes} likes</span> 
                    <span className='reaction-count'>{props.post.reactions?.dislikes} dislikes</span>

                    <span className= {'collap-expand-button ' + activecl}></span>
                    {props.post.tags && props.post.tags.length > 0 && 
                        <div className='blog-item-tag-wrapper'>
                            <span className='tag-label'>tags:</span> {props.post.tags.map((t, i) => (<span className='tag-item' key={i}>{t}</span>))}
                        </div>
                    }
                </div>

                {showComment && 
                    <>
                        <div className='blog-item-comment-wrapper'>
                            {isLoading ? 
                            <>
                                <div className='blog-item-comment-count empay empty-item'>Total Comment: <strong>00</strong></div>
                                <div className='blog-item-comment-list empty-item'>
                                    {emptyComments.map((c, i) => ( <div className='blog-comment-item' key={i}>
                                        <div className='comment-body'>{props.post.title}</div>
                                        <div className='comment-user'>likes: <strong>0</strong></div>
                                        <div className='comment-user'>poster: <strong>user fullname</strong></div>
                                    </div> ))}
                                </div>
                            </>
                            :
                            <>
                                <div className='blog-item-comment-count'>Total Comment: <strong>{pageInfo.total}</strong></div>
                                <div className='blog-item-comment-list'>
                                    {comments.map((c, i) => ( <div className='blog-comment-item' key={i}>
                                        <div className='comment-body'>{c.body}</div>
                                        <div className='comment-user'>likes: <strong>{c.likes}</strong></div>
                                        <div className='comment-user'>poster: <strong>{c.user?.fullName}</strong></div>
                                    </div> ))}
                                </div>
                            </>
                            }
                        </div>                
                    </>}                
            </div>
        </>
    );
}
