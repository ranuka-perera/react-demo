var ThumbImage = React.createClass({
    render: function () {
        return (
            <div></div>
        );
    }
});

var ThumbList = React.createClass({
    render: function () {
        return (
            <div></div>
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
                images.push(item.path);
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
