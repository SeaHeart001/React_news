import React from 'react';
import axios from 'axios';
import NewsComments from './new_comments';
import NewsImageBlock from './news_image_block';
import {
    Row,
    Col,
    BackTop
} from 'antd';

class NewsDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            news: ''
        }
        this.showDetail = this.showDetail.bind(this)
    }
    componentWillMount(){
        this.showDetail(this.props);
    }
    componentWillReceiveProps(nextProps){
        //console.log(nextProps);
        this.showDetail(nextProps);
    }
    showDetail(props) {
        console.log(props);
        let newsId = props.params.news_id;

        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${newsId}`;
        //发送ajax请求
        axios.get(url)
            .then(response => {
                let news = response.data;
                //更新状态
                this.setState({news});
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    render(){
        let {news} = this.state;
        return (
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={16}>
                        <div dangerouslySetInnerHTML={{__html : news.pagecontent}}></div>
                        <NewsComments newsId={this.props.params.news_id}/>
                    </Col>
                    <Col span={6}>
                        <NewsImageBlock type="keji" count={18} width="300px" imgWidth="115px"/>
                    </Col>
                    <Col span={1}></Col>
                </Row>
                <BackTop></BackTop>


            </div>
        )
    }
}
export default NewsDetail