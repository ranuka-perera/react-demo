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
    componentDidMount: function () {
        // When Component loads
        return;
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
