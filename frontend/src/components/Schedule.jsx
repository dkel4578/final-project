import React, { useState, useEffect } from "react"; // eslint-disable-line no-unused-vars
import PropTypes from "prop-types"; // prop-types를 import
import Swal from "sweetalert2"; // eslint-disable-line no-unused-vars
import { useCookies } from "react-cookie"; // eslint-disable-line no-unused-vars
import { parse } from "date-fns";
import { useNavigate } from "react-router-dom"; // eslint-disable-line no-unused-vars

function Schedule(props) {
	// props에서 년-월-일 가져오기

	let { year, month, date } = props;

	// 말일 구하기(다음달 기준으로 조회해서 일값=0 하면 이번달 말임)
	let lastDate = new Date(year, month + 1, 0).getDate();
	// 시작일: 달력에서 1일이 시작할 위치 (요일값 =0....6)
	let start_date = new Date(year, month, 1).getDay();

	const today = new Date().getDate();

	const [selectedDate, setSelectedDate] = useState(date);
	const [events, setEvents] = useState([]); // eslint-disable-line no-unused-vars
	const [id, setId] = useState(""); // eslint-disable-line no-unused-vars
	const [scheduleList, setScheduleList] = useState([]); // eslint-disable-line no-unused-vars

	let isLogin = false;

	const navigate = useNavigate(); // eslint-disable-line no-unused-vars

	const [cookies] = useCookies(["token"]);
	const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;
	//로그인 확인
	if (cookies.token != "undefined") {
		isLogin = true;
	} else {
		isLogin = false;
	}
	//유저 정보 가져오기
	useEffect(() => {
		if (isLogin) {
			fetch("/api/user/me", {
				method: "GET",
				headers: {
					"Content-Type": jsonContent,
					Authorization: "Bearer " + cookies.token,
				},
			})
				.then((res) => {
					if (res) {
						console.log(res);
						return res.json();
					}
				})
				.then((data) => {
					console.log(data);
					if (data) {
						setId(data.id);
					}
				});
		}
	}, [isLogin]);

	//캘린더 정보 가져오기
	useEffect(() => {
		if (isLogin) {
			fetch(`/api/schedule/view?userId=${encodeURIComponent(id)}`, {
				method: "GET",
				headers: {
					"Content-Type": jsonContent,
				},
			})
				.then((res) => {
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
	}, [isLogin, id]);

	const handleDateClick = (day) => {
		setSelectedDate(day);
		const date = parse(
			year + "-" + (month + 1) + "-" + (day + 1),
			"yyyy-MM-dd",
			new Date(),
		);
		const formattedDate = `${year}-${(month + 1)
			.toString()
			.padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
		const encodeDate = encodeURIComponent(formattedDate);

		fetch(
			`/api/schedule/view/date?userId=${encodeURIComponent(
				id,
			)}&date=${encodeDate}`,
			{
				method: "GET",
				headers: {
					"Content-Type": jsonContent,
				},
			},
		)
			.then((res) => {
				if (!res.ok) {
					throw new Error("Failed to fetch schedule data.");
				}
				return res.json();
			})
			.then((data) => {
				const event = data;
				if (event) {
					fetch(
						`/api/schedule/findId?userId=${encodeURIComponent(
							id,
						)}&date=${encodeDate}`,
						{
							method: "GET",
							headers: {
								"Content-Type": jsonContent,
							},
						},
					)
						.then((res) => res.json())
						.then((data) => {
							const scheduleId = data;
							Swal.fire({
								icon: "info",
								title: "일정",
								text: "변경할 일정을 입력해주세요.",
								input: "text",
								inputValue: event.event,
								inputPlaceholder: "일정...",
								showCancelButton: true,
								confirmButtonText: "수정",
								cancelButtonText: "삭제",
								width: 360,
							}).then((result) => {
								if (result.isConfirmed) {
									const content = result.value;
									fetch(`api/schedule/update/${scheduleId}`, {
										method: "PUT",
										headers: {
											"Content-Type": jsonContent,
										},
										body: JSON.stringify({
											content: content,
										}),
									}).then((res) => {
										if (res.status !== 200) {
											return Swal.fire({
												icon: "error",
												title: "스케쥴 수정", // Alert 제목
												text: "스케쥴 수정에 실패하였습니다.",
												width: 360, // Alert 내용
											});
										}
										Swal.fire({
											icon: "success",
											title: "스케쥴 수정", // Alert 제목
											text: "스케쥴 수정에 성공하였습니다.",
											width: 360, // Alert 내용
										});
									});
								} else if (result.dismiss === Swal.DismissReason.cancel) {
									fetch(`api/schedule/delete/${scheduleId}`, {
										method: "PUT",
										headers: {
											"Content-Type": jsonContent,
										},
									}).then((res) => {
										if (res.status !== 200) {
											return Swal.fire({
												icon: "error",
												title: "스케쥴 삭제", // Alert 제목
												text: "스케쥴 삭제에 실패하였습니다.",
												width: 360, // Alert 내용
											});
										}
										Swal.fire({
											icon: "success",
											title: "스케쥴 삭제", // Alert 제목
											text: "스케쥴 삭제에 성공하였습니다.",
											width: 360, // Alert 내용
										});
									});
								}
							});
						});
				} else {
					Swal.fire({
						icon: "info",
						title: "일정",
						text: "일정을 입력해주세요.",
						input: "text",
						inputValue: "",
						inputPlaceholder: "일정...",
						showCancelButton: true,
						confirmButtonText: "추가",
						cancelButtonText: "취소",
						width: 360,
					}).then((result) => {
						if (result.isConfirmed) {
							const content = result.value;
							if (typeof content !== "undefined") {
								fetch(`api/schedule/add`, {
									method: "POST",
									headers: {
										"Content-Type": jsonContent,
									},
									body: JSON.stringify({
										userId: id,
										content: content,
										date: date,
									}),
								})
									.then((res) => {
										if (res.status !== 200) {
											return Swal.fire({
												icon: "error",
												title: "스케쥴 추가",
												text: "스케쥴 추가에 실패했습니다.",
												width: 360,
											});
										}
										Swal.fire({
											icon: "success",
											title: "스케쥴 추가",
											text: "스케쥴 추가에 성공했습니다.",
											width: 360,
										});
										return res.json();
									})
									.catch((error) => {
										Swal.fire({
											icon: "error",
											title: "일정 조회 오류",
											text: error,
											width: 360,
										});
									});
							}
						}
					});
				}
			})
			.catch((error) => {
				console.error("Error fetching schedule:", error);
				Swal.fire({
					icon: "error",
					title: "일정 조회 오류",
					text: "일정을 조회하는 도중 오류가 발생했습니다.",
					width: 360,
				});
			});
	};
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
									onClick={() => handleDateClick(day)}
									style={{
										color: selectedDate === day ? "red" : "black",
										fontSize: selectedDate === day ? "1rem" : "1rem",
										fontWeight: selectedDate === day ? "bold" : "normal",
										backgroundColor: scheduleInfo ? "#f7e385" : "transparent",
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
					{/* {events.map((event) => (
            <div key={`${event.year}-${event.month}-${event.day}`}>
              <span>
              ◎ {event.year }년{event.month + 1}월 {event.day}일:{" "}
              </span>
              <span>{event.event}</span>

              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation(); // 이벤트 버블링 방지
                  setEvents((prevEvents) =>
                    prevEvents.filter((e) => e.day !== event.day)
                  );
                }}
              >
                삭제
              </button>
            </div>
          ))} */}
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
				<button className="schedule" onClick={() => handleDateClick(today)}>
					+ 일정 추가
				</button>
			</div>
		</div>
	);
}

Schedule.propTypes = {
	year: PropTypes.number.isRequired,
	month: PropTypes.number.isRequired,
	date: PropTypes.number.isRequired,
};
export default Schedule;