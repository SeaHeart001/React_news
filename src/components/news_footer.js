import React from 'react';
import {Row, Col} from 'antd';
import '../componentsCss/news_footer.css';

class NewsFooter extends React.Component{
    render(){
        return (
            <div className="newsFooter">
                <Row>
                    <Col span={24}>
                        &copy; 2016 ReactNews. All Rights Reserved.
                    </Col>
                </Row>
            </div>
        )
    }
}
export default NewsFooter