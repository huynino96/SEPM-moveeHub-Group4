import React from 'react';

const Comment = ({ name, comment, date, imageUrl }) => (
    <div className="row">
        <div className="col-sm-2">
            <img src={imageUrl} alt="avatar" style={{ borderRadius: '50%' }} />
        </div>
        <div className="col-sm-9">
            <span className="date">{date}</span>
            <h4 className="no-underline">{name}</h4>
            <p>{comment}</p>
        </div>
    </div>
);

Comment.defaultProps = {
    name: '',
    comment: '',
    date: '',
    imageUrl: '/images/avatar.png',
};

export default Comment;
