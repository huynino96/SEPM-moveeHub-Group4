import React from 'react';

const Comment = ({ id, name, comment, date, imageUrl, canAction, like, onLike }) => (
    <div className="row">
        <div className="col-sm-2">
            <img src={imageUrl} alt="avatar" style={{ borderRadius: '50%' }} />
        </div>
        <div className="col-sm-9">
            <span className="date">{date}</span>
            <h4 className="no-underline">{name}</h4>
            <p>{comment}</p>
            {(typeof like !== "undefined" && canAction) && (
                <span className="action">
                    {like ? (
                        <i
                            className="material-icons"
                            style={{ color: '#e74c3c', cursor: 'pointer' }}
                            onClick={() => onLike(id, like)}
                        >
                            favorite
                        </i>
                    ) : (
                        <i
                            className="material-icons"
                            style={{ cursor: 'pointer' }}
                            onClick={() => onLike(id, like)}
                        >
                            favorite_border
                        </i>
                    )}
                </span>
            )}
        </div>
    </div>
);

Comment.defaultProps = {
    name: '',
    comment: '',
    date: '',
    imageUrl: '/images/avatar.png',
    onLike: () => {},
};

export default Comment;
