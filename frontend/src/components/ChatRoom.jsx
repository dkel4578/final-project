import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useNavigate, useParams } from "react-router-dom";
import { customHistory } from "../store/configureStore.js";
// import { actionCreators as chattingActions } from "../store/modules/chatting";
import { actionCreators as userActions } from "../store/modules/user";
import UserProfile from "./UserProfile.jsx";
import "../script/custom.js";
import "../script/manner-score.js";
import "../script/chat-list-room.js";
import Swal from "sweetalert2";
import axios from "axios";

function ChatRoom(props) {
  const userInfo = useSelector((state) => state.user.user);
  console.log("chatroom props:", props);
  console.log("chatroom props.userData:", props.userData);
  const [imgSrcList, setImgSrcList] = useState([]);
  const [userImgList, setUserImgList] = useState([]);
  const [selectedReview, setSelectedReview] = useState("");

  console.log(imgSrcList);

  const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;
  const navigate = useNavigate();
  const [selectedStars, setSelectedStars] = useState(5);
  const handleStarClick = (starIndex) => {
    setSelectedStars(starIndex + 1);
  };
  const [roomId, setRoomId] = useState("");
  const goChatRoomClick = (roomId, roomName) => {
    navigate(`/chat/room/list/${roomId}`, {
      state: { chatRoomProps: props, roomId: roomId, roomName: roomName },
    });
  };

  const [isValid, setIsValid] = useState(false);
  const [isValid2, setIsValid2] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleClassName = (roomId) => {
    setIsValid(!isValid);
    setRoomId(roomId);
  };

  const handleClassName2 = () => {
    setIsValid2(!isValid2);
  };

  const [updatedImgSrc, setUpdatedImgSrc] = useState("");

  const [reviewUserId, setReviewUserId] = useState("");

  const handleReviewChange = (e) => {
    setSelectedReview(e.target.value); // 선택된 리뷰 항목 업데이트
  };

  const reviewUserHandler = (reviewUser) => {
    setReviewUserId(reviewUser);
  };

  // useEffect(() => {
  //   if (props.userData && props.userData.imgSrc) {
  //     const publicIndex = props.userData.imgSrc.indexOf("/public/");
  //     if (publicIndex !== -1) {
  //       const updatedSrc = props.userData.imgSrc.substring(
  //         publicIndex + "/public/".length
  //       );
  //       setUpdatedImgSrc(updatedSrc);
  //     }
  //     console.log("updatedImgSrc >>>>>>>>>>", updatedImgSrc);
  //   }
  // }, [props.userData, setIsValid]);
  // 채팅방 프로필 사진 가져오기
  const fetchImageByRoomId = async (roomId) => {
    try {
      const res = await axios.get(`/api/chatProfile/${roomId}`, {
        responseType: "blob",
      });
      const imageUrl = URL.createObjectURL(res.data);
      return imageUrl; // 이미지 URL 반환
    } catch (error) {
      console.log(error);
      return "/profileImg/default-image.svg";
    }
  };

  useEffect(() => {
    // props.chatRoomList를 순회하며 이미지 URL을 가져와 imgSrcList에 추가
    const fetchImages = async () => {
      const imageUrls = await Promise.all(
        props.chatRoomList.map(async (chatRoom) => {
          const imageUrl = await fetchImageByRoomId(chatRoom.id);
          return imageUrl;
        })
      );
      setImgSrcList(imageUrls);
    };

    fetchImages();
  }, [props.chatRoomList]);

  //채팅방 유저 프로필 사진 가져오기
  // const fetchImageByUserId = async (userId) => {
  //   try {
  //     const res = await axios.get(`/api/profile/me/${userId}`, {
  //       responseType: "blob",
  //     });
  //     const imageUrl = URL.createObjectURL(res.data);
  //     console.log(imageUrl)
  //     return imageUrl; // 이미지 URL 반환
  //   } catch (error) {
  //     console.log(error);
  //     return "/profileImg/default-image.svg";
  //   }
  // };


  // useEffect(() => {
  //   const fetchImages = async () => {
  //     const imageUrls = await Promise.all(
  //       props.userData.map (async (data, index) => {
  //         if (data.userId !== userInfo.uid && roomId === data.roomId) {
  //         const imageUrl = await fetchImageByUserId(data.userId);
  //         return imageUrl;
  //         }
  //       })
  //     );
  //     setUserImgList(imageUrls);
  //   };

  //   fetchImages();
  // }, [props.chatRoomList]);

  const reviewhandler = (userId, e) => {
    e.preventDefault();

    fetch(`/api/manner/add`, {
      method: "POST",
      headers: {
        "Content-Type": jsonContent,
      },
      body: JSON.stringify({
        userId: reviewUserId,
        reviewerId: userInfo.uid,
        score: selectedStars,
        review: selectedReview,
      }),
    }).then((res) => {
      console.log("Chatroom REs >>>>> ", res);
      if (res.status !== 200) {
        return Swal.fire({
          icon: "error",
          title: "리뷰", // Alert 제목
          text: "리뷰 등록에 실패하였습니다.",
          width: 360, // Alert 내용
        });
      }
      Swal.fire({
        icon: "success",
        title: "리뷰", // Alert 제목
        text: "리뷰 등록에 성공하였습니다.",
        width: 360, // Alert 내용
      });
      navigate("/chat/room/list2");
      return res.json();
    });
  };

  const quitChat = (e) => {
    e.preventDefault();
    fetch(
      `/api/quitChatRoom?userId=${encodeURIComponent(
        userInfo.uid
      )}&roomId=${encodeURIComponent(roomId)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": jsonContent,
        },
      }
    ).then((res) => {
      if (!res.ok) {
        return Swal.fire({
          icon: "error",
          title: "채팅", // Alert 제목
          text: "채팅방 나가기에 실패했습니다.",
          width: 360, // Alert 내용
        });
      }
      Swal.fire({
        icon: "success",
        title: "채팅", // Alert 제목
        text: "채팅방 종료에 성공했습니다.",
        width: 360, // Alert 내용
      });
      window.location.reload();
    });
  };

  const copyUrl = (roomId) => {
    let url = "";
    let textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    url = `localhost:3000/final-project/chatName/${roomId}`;
    textarea.value = url;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    Swal.fire({
      icon: "success",
      title: "채팅", // Alert 제목
      text: "채팅방 링크가 복사되었습니다.",
      width: 360, // Alert 내용
    });
  };

  return (
    <section className="chat-list-room">
      {/* 유저평가 모달 */}
      <div className={`chat-user-evaluation-modal ${isValid ? "active" : ""}`}>
        <div className="chat-user-evaluation-modal-content">
          <div className="chat-user-evaluation-modal-content-title">
            <p>잠깐!</p>
            <p>유저에 대한 리뷰를 남겨주세요!</p>
          </div>
          <div className="chat-user-evaluation-modal-content-user-list">
            {props.userData ? (
              props.userData.map((data, index) => {
                if (data.userId !== userInfo.uid && roomId === data.roomId) {
                  return (
                    <UserProfile
                      key={index}
                      userId={data.userId}
                      nickname={data.nickname}
                    />
                  ); // 해당 사용자는 랜더링하지 않음
                }
                return null;
              })
            ) : (
              <p>사용자 정보가 없습니다.</p>
            )}
            <div className="chat-user-evaluation-modal-exit-btns">
              <input
                className="chat-user-evaluation-btn chat-user-evaluation-quit-btn"
                type="button"
                value="안할래요"
                onClick={quitChat}
              />
              <input
                className="chat-user-evaluation-btn chat-user-evaluation-cancel-btn"
                type="button"
                value="취소"
                onClick={handleClassName}
              />
            </div>
          </div>
        </div>
      </div>
      {/* 별점주기 모달 */}
      <div className={`manner-score-modal ${isValid2 ? "active" : ""}`}>
        <div className="manner-score-modal-content">
          <i
            className="fa fa-close manner-modal-close"
            aria-hidden="true"
            onClick={handleClassName2}
          ></i>
          <div className="manner-score-modal-title">
            <i className="bi bi-clipboard-check"></i>
            <h1>매너점수 체크</h1>
          </div>
          <div className="manner-score-modal-check">
            <label htmlFor="so-kind">
              <input
                type="radio"
                id="so-kind"
                className="manner-check-box"
                name="manner-radio"
                value="K"
                onChange={handleReviewChange}
              />
              <i className="manner-check"></i>
              <span>너무 친절해요</span>
            </label>
            <label htmlFor="so-fun">
              <input
                type="radio"
                id="so-fun"
                className="manner-check-box"
                name="manner-radio"
                value="D"
                onChange={handleReviewChange}
              />
              <i className="manner-check"></i>
              <span>맛집을 잘 알고있어요</span>
            </label>
            <label htmlFor="great-talk">
              <input
                type="radio"
                id="great-talk"
                className="manner-check-box"
                name="manner-radio"
                value="F"
                onChange={handleReviewChange}
              />
              <i className="manner-check"></i>
              <span>시간가는 줄 모르고 떠들게돼요</span>
            </label>
            <label htmlFor="later-meet">
              <input
                type="radio"
                id="later-meet"
                className="manner-check-box"
                name="manner-radio"
                value="P"
                onChange={handleReviewChange}
              />
              <i className="manner-check"></i>
              <span>사진을 잘 찍어줘요</span>
            </label>
            <div className="manner-star-rating">
              {[0, 1, 2, 3, 4].map((starIndex) => (
                <i
                  key={starIndex}
                  className={`manner-star bi bi-star-fill ${
                    starIndex < selectedStars ? "active" : ""
                  }`}
                  onClick={() => handleStarClick(starIndex)}
                ></i>
              ))}
            </div>
          </div>
          <div className="review-complete-place">
            <input
              type="button"
              value="리뷰작성"
              className="review-complete-btn"
              onClick={(e) => {
                reviewhandler(reviewUserId, e);
                quitChat(e);
              }}
            />
            <input
              type="button"
              value="취소"
              className="review-cancel-btn"
              onClick={handleClassName2}
            />
          </div>
        </div>
      </div>

      {props.chatRoomList.map((chatRoom, idx) => (
        <li className="chat-list-single" key={idx}>
          <div className="chat-sub">{chatRoom.roomName}</div>
          <div className="chat-user-detail-informations">
            <div className="chat-user-profile">
              <img src={imgSrcList[idx]} alt="Profile" />
            </div>
            <div
              className="chat-user-opponent"
              onClick={() => {
                goChatRoomClick(chatRoom.id, chatRoom.roomName);
              }}
            >
              {props.userData ? (
                <div className="chat-user-opponent-user-id">
                  {props.userData.map((user, idx) =>
                    user.roomId == chatRoom.id ? (
                      <span key={idx}>{user.nickname} </span>
                    ) : (
                      <span></span>
                    )
                  )}
                </div>
              ) : (
                <p>데이터 없음</p>
              )}
            </div>

            <div className="chat-list-icons">
              <i
                className="bi bi-share-fill share"
                onClick={(e) => copyUrl(chatRoom.id)}
              >
                <div className="share-box">공유하기</div>
              </i>
              <i
                className="bi bi-box-arrow-right chat-leave"
                onClick={(e) => handleClassName(chatRoom.id)}
              ></i>
            </div>
          </div>
        </li>
      ))}
      {/* <ChatRoomStyle>
        <ChatRoomName>{props.roomName}({props.nickname})님꺼~</ChatRoomName>
        <ChatRoomEnter onClick={() => {
          goChatRoomClick(props.id);
        }}>
          입장
        </ChatRoomEnter>
      </ChatRoomStyle> */}
    </section>
  );
}

export default ChatRoom;
