import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatProfile = ({ userId, nickname }) => {
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
    <>
        <div className="chatting-room-name-user-profile-infos">
          <div className="chatting-room-name-user-profile">
            <img src={imageUrl} alt="유저프로필" />
          </div>
          <div className="chatting-room-name-user-nickname">
            <span>{nickname}</span>
          </div>
        </div>
    </>
  );
};

export default ChatProfile;
