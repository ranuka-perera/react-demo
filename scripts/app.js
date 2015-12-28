var ThumbImage = React.createClass({
    clickImage: function () {
        this.props.updateCropper(this.props.url);
    },
    render: function () {
        return (
            <li className="thumb">
                <img src={this.props.url} alt={this.props.altText} className="thumb-image"
                     onClick={this.clickImage}/>
            </li>
        );
    }
});

var ThumbList = React.createClass({
    render: function () {
        var count = 0;
        var clickHandler = this.props.updateCropper;
        var thumbs = this.props.images.map(function (image) {
            count += 1;
            return (
                <ThumbImage url={image.url} altText={image.title} key={count} updateCropper={clickHandler}/>
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
    getInitialState: function () {
        return {initialRenderComplete:false};
    },
    componentDidUpdate: function () {
        if (this.props.src && !this.state.initialRenderComplete) {
            $(function () {
                $('#cropper-image').cropper({
                    viewMode: 1,
                    dragMode: 'move',
                    autoCropArea: 3.61,
                    restore: false,
                    guides: false,
                    highlight: false,
                    cropBoxMovable: false,
                    cropBoxResizable: false
                });
            });
            self.setState({initialRenderComplete: true});
        }

    },
    render: function () {
        return (
            <img id="cropper-image" src={this.props.src}/>
        );
    }
});

var Cropper = React.createClass({
    render: function () {
        return (
            <div className="cropper-area">
                <CropperImage src={this.props.url} />
            </div>
        );
    }
});

var MainPage = React.createClass({
    updateCropper: function (imageUrl) {
        this.setState({selectedImage: imageUrl});
    },
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
        return {images: [], selectedImage: ''};
    },
    componentWillMount: function () {
        // When Component loads
        $.ajax({
            url: this.props.url,
            crossDomain: true,
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            type: 'GET',
            success: function (data) {
                var imagedata = this.parseData(data);
                this.setState({images: imagedata, selectedImage: imagedata[0].path});
            }.bind(this),
            error: function () {
                alert("Data failed to load");
            }.bind(this)
        });
    },
    render: function () {
        return (
            <div className="main-page">
                <ThumbList images={this.state.images} updateCropper={this.updateCropper}/>
                <Cropper url={this.state.selectedImage}/>
            </div>
        );
    }
});

ReactDOM.render(
    <MainPage url="//www.yamu.lk/api/?v=2.0&start=0&size=20&section=public&action=getAllAttachments" />,
    document.getElementById('content')
);
