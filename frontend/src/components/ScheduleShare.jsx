import React, { useState, useEffect } from "react"; // eslint-disable-line no-unused-vars
import PropTypes from "prop-types"; // prop-types를 import
import Swal from "sweetalert2"; // eslint-disable-line no-unused-vars
import { useCookies } from "react-cookie"; // eslint-disable-line no-unused-vars
import { parse } from "date-fns";
import { useNavigate } from "react-router-dom"; // eslint-disable-line no-unused-vars
import { useParams } from 'react-router-dom';

function ScheduleShare(props) {
  const [scheduleList, setScheduleList] = useState([]); 
  const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;
  let { year, month, date } = props;
  let start_date = new Date(year, month, 1).getDay();
  let lastDate = new Date(year, month + 1, 0).getDate();

  const loginId = (window.location.pathname).split('/').pop();
  console.log(loginId);
  
  const [selectedDate, setSelectedDate] = useState(date);
  	//캘린더 정보 가져오기
	useEffect(() => {
    console.log("useEffect")
			fetch(`/api/schedule/share?loginId=${encodeURIComponent(loginId)}`, {
				method: "GET",
				headers: {
					"Content-Type": jsonContent,
				},
			})
				.then((res) => {
          console.log("res",res);
					if (res.ok) {
						return res.json(); // 응답이 성공인 경우에만 json 변환
					}
					throw new Error("Network response was not ok");
				})
				.then((data) => {
					console.log("data : ", data);
					setScheduleList(data);
				})
				.catch((error) => {
					console.error("Fetch error:", error);
				});
		}
	, [loginId, scheduleList]);
  return (
    <div className="calendar">
			<header className="calendar-header">
				<span className="Month">{month + 1}월</span>
			</header>

			<main>
				<div className="daysArray">
					<div className="days">Sun</div>
					<div className="days">Mon</div>
					<div className="days">Tue</div>
					<div className="days">Wed</div>
					<div className="days">Thu</div>
					<div className="days">Fri</div>
					<div className="days">Sat</div>
				</div>
				<ul className="date">
					{Array(start_date)
						.fill()
						.map((_, i) => {
							return <li key={`empty-${i}`}></li>;
						})}
					{Array(lastDate)
						.fill()
						.map((_, i) => {
							const day = i + 1;
							const scheduleInfo = scheduleList.find((schedule) => {
								const parsedDate = new Date(schedule.date);
								return (
									parsedDate.getDate() === day &&
									parsedDate.getMonth() === month &&
									parsedDate.getFullYear() === year
								);
							});

							return (
								<li
									key={`day-${day}`}
									style={{
										color: selectedDate === day ? "#48a26b" : "black",
										fontSize: selectedDate === day ? "1.3rem" : "1.3rem",
										fontWeight: selectedDate === day ? "bold" : "normal",
										backgroundColor: scheduleInfo ? "#f7e385" : "transparent",
                    border: selectedDate === day ? "1px solid #2ACF7D" : "1px solid #2ACF7D",
										position: "relative", // 상대 위치 지정
										display: "flex",
										flexDirection: "column",
										alignItems: "flex-start", // 왼쪽 정렬
										justifyContent: "flex-start", // 상단 정렬
									}}
								>
									{day}
								</li>
							);
						})}
				</ul>
			</main>

			<div className="container1">
				<h3>─── 일정 목록 ─── </h3>
				{/* 일정 목록과 삭제 버튼 */}
        <div className="events-list">
          {scheduleList
            .filter((scheduleInfo) => {
              const scheduleYear = new Date(scheduleInfo.date).getFullYear();
              const scheduleMonth = new Date(scheduleInfo.date).getMonth() + 1;
              return scheduleYear === year && scheduleMonth === month + 1;
            })
            .map((scheduleInfo, index) => (
              <div key={index}>
                <p>
                  {scheduleInfo.date} : {scheduleInfo.content}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

ScheduleShare.propTypes = {
	year: PropTypes.number.isRequired,
	month: PropTypes.number.isRequired,
	date: PropTypes.number.isRequired,
};

export default ScheduleShare
