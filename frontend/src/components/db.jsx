import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/', // 여기에 실제 API의 baseURL을 입력해주세요
    timeout: 10000, // 요청의 타임아웃 설정 (옵션)
    headers: {
        'Content-Type': 'application/json', // 요청 헤더 설정 (옵션)
    },
});

export default instance;