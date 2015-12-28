var ThumbImage = React.createClass({
    render: function () {
        return (
            <li className="thumb">
                <img src={this.props.url} alt={this.props.altText} className="thumb-image"/>
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
                <ThumbImage url={image.url} altText={image.title} key={count}/>
            );
        });
        return (
            <ul className="thumbList">
                {thumbs}
            </ul>
        );
    }
});

var Cropper = React.createClass({
    render: function () {
        return (
            <div></div>
        );
    }
});

var MainPage = React.createClass({
    // Return the image array.
    parseData: function (jsonData) {
        var images = [];
        jsonData.forEach(function (item) {
            if (item.mime_type === 'image/jpeg' || item.mime_type === 'image/png') {
                images.push({url: item.path, title: item.title});
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
