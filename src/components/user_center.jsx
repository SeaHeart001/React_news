import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import {
    Row,
    Col,
    Tabs,
    Card,
    Upload,
    Modal,
    Icon
} from 'antd';
const TabPane = Tabs.TabPane;

class UserCenter extends React.Component{
    constructor(props){
        super(props);
        //初始化状态
        this.state = {
            comments : [],
            collections : [],
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }]
        }
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })


    componentWillMount(){
        //获取评论列表数据
        let userId = JSON.parse(localStorage.getItem('user_KEY')).userId;
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`;
        axios.get(url)
            .then(response => {
                let comments = response.data;
                //更新comments的状态
                this.setState({comments});
            });
        //获取收藏列表数据
        url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`;
        axios.get(url)
            .then(response => {
                let collections = response.data;
                //更新comments的状态
                this.setState({collections});
            });
    }
    render(){
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );


        let {comments, collections} = this.state;
        let collectionsList = collections.length>0
        ?(
            collections.map((item, index) => {
                return (
                    <Card key={index} title={item.uniquekey} extra={<p style={{color :'red'}}><Link  to={`/news_detail/${item.uniquekey}`}>查看</Link></p>}>
                        {item.Title}
                    </Card>
                )
            })
        )
        :'目前没有任何收藏';

        let commentsList = comments.length>0
        ?(
            comments.map((comment, index) => {
                return (
                    <Card key={index} title={`于：${comment.datetime}评论了：${comment.uniquekey}`} extra={<p style={{color :'red'}}><Link  to={`/news_detail/${comment.uniquekey}`}>查看</Link></p>}>
                        {comment.Comments}
                    </Card>
                )
            })
        )
        :'您当前没有任何评论';
        return (
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <Tabs>
                            <TabPane tab="我的收藏列表" key="1">
                                {collectionsList}
                            </TabPane>
                            <TabPane tab="我的评论列表" key="2">
                                {commentsList}
                            </TabPane>
                            <TabPane tab="头像设置" key="3">
                                <Upload
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange} multiple="true"
                                >
                                    {uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}
export default UserCenter