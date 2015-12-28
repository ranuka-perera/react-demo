var ThumbImage = React.createClass({
    generateThumbnail: function (url, dimensions, targetWidth, callback) {
        // Based on https://stackoverflow.com/a/7557690 & https://stackoverflow.com/a/6005211
        var canvas = document.createElement("canvas");
        var img = new Image();
        img.crossOrigin = 'anonymous';
        var tempScale = targetWidth / dimensions.width;

        canvas.width = dimensions.width * tempScale;
        canvas.height = dimensions.height * tempScale;
        var ctx = canvas.getContext("2d");
        img.onload = function () {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            var thumbUrl = canvas.toDataURL("image/png");
            if (callback) {
                callback(thumbUrl);
            }
        };
        img.src = url;
    },
    getInitialState: function () {
        return {url: ''};
    },
    componentDidMount: function () {
        this.generateThumbnail(this.props.url, this.props.dimensions, 300, function (thumbUrl) {
            this.setState({url: thumbUrl});
        });
    },
    render: function () {
        return (
            <li className="thumb">
                <img src={this.state.url} alt={this.props.altText} className="thumb-image"/>
            </li>
        );
    }
});

var ThumbList = React.createClass({
    render: function () {
        var count = 0;
        var thumbs = this.props.images.map(function (image) {
            count += 1;
            return (
                <ThumbImage url={image.url} altText={image.title} dimensions={image.dimensions} key={count}/>
            );
        });
        return (
            <ul className="thumb-list">
                {thumbs}
            </ul>
        );
    }
});
var CropperImage = React.createClass({
    render: function () {
        return <div></div>;
    }
});

var Cropper = React.createClass({
    render: function () {
        return (
            <div className="cropper-area"></div>
        );
    }
});

var MainPage = React.createClass({
    // Return the image array.
    parseData: function (jsonData) {
        var images = [];
        jsonData.forEach(function (item) {
            if (item.mime_type === 'image/jpeg' || item.mime_type === 'image/png') {
                images.push({url: item.path, title: item.title, dimensions: {width: item.width, height: item.height}});
            }
        });
        return images;
    },
    getInitialState: function () {
        return {images: []};
    },
    componentDidMount: function () {
        // When Component loads
        $.ajax({
            url: this.props.url,
            crossDomain: true,
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            type: 'GET',
            success: function (data) {
                this.setState({images: this.parseData(data)});
            }.bind(this),
            error: function () {
                alert("Data failed to load");
            }.bind(this)
        });
    },
    render: function () {
        return (
            <div className="main-page">
                <ThumbList images={this.state.images}/>
                <Cropper />
            </div>
        );
    }
});

ReactDOM.render(
    <MainPage url="//www.yamu.lk/api/?v=2.0&start=0&size=20&section=public&action=getAllAttachments" />,
    document.getElementById('content')
);
