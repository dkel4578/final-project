import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import MapComponent from './MapComponent';


class MapEmbed extends ReactQuill.Quill.import('blots/block/embed') {
    static create(value) {
        const node = super.create();
        const mapContainer = document.createElement('div');
        mapContainer.className = 'map-container';
        node.appendChild(mapContainer);

        const script = document.createElement('script');
        script.async = true;
        // script.defer = true;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=a56f0d80bc172162dfbd97d2c1042bea&autoload=false&libraries=services`;

        script.onload = () => {
            window.kakao.maps.load(() => {
                const options = {
                    center: new window.kakao.maps.LatLng(value.lat, value.lng),
                    level: 3,
                };
                const map = new window.kakao.maps.Map(mapContainer, options);

                // 이벤트 핸들러 등록
                window.kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
                    const latlng = mouseEvent.latLng;
                    console.log("Clicked at", latlng.getLat(), latlng.getLng());
                });


            });
        };

        document.head.appendChild(script); // Load script in the head
        return node;
    }
}

MapEmbed.blotName = 'map-embed';
MapEmbed.tagName = 'div';
MapEmbed.className = 'ql-map-embed';

ReactQuill.Quill.register(MapEmbed, true);

class EditorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.quillRef = React.createRef();
    }

    focusEditor = () => {
        if (this.quillRef && this.quillRef.current) {
            this.quillRef.current.focus();
        }
    }

    modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'map-embed'],
            [{ 'align': [] }, { 'color': [] }, { 'background': [] }],
            ['clean']
        ],
        clipboard: {
            matchVisual: false,
        }
    }

    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'map-embed',
        'align', 'color', 'background',
    ]

    render() {
        // eslint-disable-next-line react/prop-types
        const { value, onChange } = this.props;
        return (
            <div style={{ height: '350px' }}>
                <ReactQuill
                    ref={this.quillRef}
                    style={{ height: '300px' }}
                    theme="snow"
                    modules={this.modules}
                    formats={this.formats}
                    value={value || ''}
                    onChange={onChange}
                />
                {/*<MapComponent />*/}
            </div>
        );
    }
}

export default EditorComponent;
