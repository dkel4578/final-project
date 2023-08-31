import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = ({ userId, nickname, reviewUserHandler, handleClassName2  }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(`/api/profile/me/${userId}`, {
          responseType: 'blob',
        });
        const imageUrl = URL.createObjectURL(res.data);
        setImageUrl(imageUrl);
      } catch (error) {
        console.log('Error fetching image:', error);
      }
      
    };

    fetchImage();
  }, [userId]);

  return (
    <div className="chat-user-evaluation-modal-content-user-info">
      <div className="chat-user-evaluation-modal-content-user-profile">
        <img src={imageUrl} alt="" className='chat-user-evaluation-modal-content-user-profile-img' />
      </div>
      <div className="chat-user-evaluation-modal-content-user-nickname">
        <span>{nickname}</span>
      </div>
      <div className="chat-user-evaluation-modal-content-give-star">
        <input
          type="button"
          value="별점주기"
          onClick={() => {
            handleClassName2();
            reviewUserHandler(userId);
          }}
        />
      </div>
    </div>
  );
};

export default UserProfile;
