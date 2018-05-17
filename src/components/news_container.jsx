import React from 'react';
import NewsImageBlock from './news_image_block';
import NewsBlock from './news_block';
import NewsProducts from './news_products';
import {
    Row,
    Col,
    Carousel,
    Tabs
} from 'antd';

import carousel_1 from '../images/carousel_1.jpg';
import carousel_2 from '../images/carousel_2.jpg';
import carousel_3 from '../images/carousel_3.jpg';
import carousel_4 from '../images/carousel_4.jpg';

import '../componentsCss/news_container.css';

const TabPane = Tabs.TabPane;

class NewsContainer extends React.Component{
    render(){
        return (
            <div className="newsContainer">
                <Row>
                    <Col span={1}></Col>

                    <Col span={22}>
                        <div className="leftContainer1">
                            <Carousel autoplay>
                                <div><img src={carousel_1} alt=""/></div>
                                <div><img src={carousel_2} alt=""/></div>
                                <div><img src={carousel_3} alt=""/></div>
                                <div><img src={carousel_4} alt=""/></div>

                            </Carousel>
                            <NewsImageBlock title="国际头条" count={6} type="guoji" width="100%" imgWidth="115px"/>
                        </div>
                        <Tabs className="news_tab">
                            <TabPane tab="娱乐新闻" key="1">
                                <NewsBlock type="yule" count={22}/>
                            </TabPane>
                            <TabPane tab="科技" key="2">
                                <NewsBlock type="keji" count={25}/>
                            </TabPane>
                        </Tabs>
                        <Tabs className="news_product">
                            <TabPane tab="React产品" key="1">
                                <NewsProducts />
                            </TabPane>

                        </Tabs>
                        <div>
                            <NewsImageBlock title="国内新闻" count={8} type="guonei" width="100%" imgWidth="115px"/>
                            <NewsImageBlock title="娱乐新闻" count={16} type="yule" width="100%" imgWidth="115px"/>
                        </div>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}
export default NewsContainer