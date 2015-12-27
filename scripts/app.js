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
    parseData: function (json_data) {

    },
    getInitialState: function () {
        return {images: []};
    },
    componentDidMount: function () {
        // When Component loads
        $.ajax(
            {
                url: this.props.url,
                crossDomain: true,
                dataType: 'jsonp',
                jsonp: 'jsoncallback',
                type: 'GET',
                success: function (data) {
                    this.setState({images: this.parseData(data)});
                }.bind(this)
            }
        );
    },
    render: function () {
        return (
            <div className="main-page">
                <ThumbList />
                <Cropper />
            </div>
        );
    }
});

ReactDOM.render(
    <MainPage url="https://www.yamu.lk/api/?v=2.0&start=0&size=20&section=public&action=getAllAttachments" />,
    document.getElementById('content')
);
