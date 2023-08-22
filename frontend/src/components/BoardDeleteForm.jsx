import React, { useState, useEffect, useRef } from 'react';
import { useLocation  } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import dayjs from 'dayjs';
import '../css/index.css';
import '../css/total.css';
import '../css/board.css';
import '../css/variables.css';
import '../css/post-content-modify.css';
import Editor from './EditorComponent.jsx';
import { navigate } from 'jsdom/lib/jsdom/living/window/navigation'; //에디터

function BoardEditForm() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id'); // Extract id from URL parameter

    console.log("id ===================>>>",id);

    const shouldDelete = window.confirm('게시글을 삭제하시겠습니까?');
    if (shouldDelete) {
        const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;

        fetch(`/api/board/delete/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': jsonContent,
                id: id,
                delYn: "Y",
            },
            body: JSON.stringify({}),
        }).then((data) => {
            if (data && data.status === 200) {
                alert('게시글이 삭제되었습니다.');
                window.location.href = `/`;
            } else {
                alert('게시글 삭제가 실패되었습니다.');
                window.location.href = `/board/view?id=${id}`;
            }
        });
    }
}

export default BoardEditForm;
