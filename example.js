/**
 * Author: humingzhi
 * Date: 20/02/2017
 * Email: 1330745625@qq.com
 */
import React from 'react'
import { render } from 'react-dom'
import Calendar from './index'
import './style/react-calendar.less'

render(
    <div>
        <Calendar
            panelAnimation="fade"
            viewMode='time'
            timeFormat="YYYY年MM月DD日 hh时"
            dateFormat="YYYY年MM月DD日"
            inputProps = {{
           'id': "a-react-calendar",
           'className': 'general-input',
           'data-tip': '',
           'data-event': 'focus',
           'data-event-off': 'blur'
       }}
        />
    </div>,
    document.getElementById('example')
)