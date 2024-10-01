import React from 'react'

export default function CommentList(props){
    const emptyCl = props.isEmpty ? ' empty-item' : '';
  return (
    <>
        <div className={'blog-item-comment-count' + emptyCl}>Total Comment: <strong>{props.isEmpty ? 0 : props.total}</strong></div>
        <div className={'blog-item-comment-list' + emptyCl}>
            {props.comments.map((c, i) => ( 
                <div className='blog-comment-item' key={i}>
                    <div className='comment-body'>{props.isEmpty ? 'A long black shadow slid across the pavement' : c.body}</div>
                    <div className='comment-user'>likes: <strong>{props.isEmpty ? '0' : c.likes}</strong></div>
                    <div className='comment-user'>poster: <strong>{props.isEmpty ? 'Julian James' : c.user?.fullName}</strong></div>
                </div> 
            ))}
        </div>    
    </>
  )
}
