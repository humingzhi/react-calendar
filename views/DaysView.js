/**
 * Author: humingzhi
 * Date: 20/02/2017
 * Email: 1330745625@qq.com
 */
import React, {Component, PropTypes} from 'react'
import ReactCssTransitionGroup from 'react-addons-css-transition-group'
import {getYMDays, getWeekOfDate, isToday, sameDay, formatDate, compareDates} from '../utils/helper'
import {months, week, buttons, weekends, hour} from '../utils/locale'

export default class DaysView extends Component {
    constructor(props) {
        super(props)
        const date = props.defaultValue || new Date()
        const year = date.getFullYear()
        const month = date.getMonth()
        const _date = date.getDate()
        const hour = date.getHours()
        this.getDates = this.getDates.bind(this)
        this.renderDates = this.renderDates.bind(this)
        this.clickLeft = this.clickLeft.bind(this)
        this.clickRight = this.clickRight.bind(this)
        this.confirm = this.confirm.bind(this)
        this.cancel = this.cancel.bind(this)
        this._getChoseDate = this._getChoseDate.bind(this)
        this._notifyView = this._notifyView.bind(this)
        this.renderHours = this.renderHours.bind(this)
        this.state = {year,month,date:_date,hour,direction:'Right',choseDate: props.defaultValue,before: false,hasChoseDate:false}
        this.key = 0
    }

    componentWillReceiveProps(nextProps) {
        this.setState({choseDate: nextProps.defaultValue})
    }

    _getChoseDate() {
        const date = this.state.choseDate
        if(!date) return ''
        return formatDate('date', date, this.props.dateFormat)
    }

    _notifyView(date, time, cancel) {
        this.props.onChoose(date,time,cancel)
    }

    choseDate(date) {
        const lastChoseValue = this.state.choseDate
        let before = this.state.before
        date = date.date
        if(lastChoseValue) before = compareDates(date, lastChoseValue) < 0
        if(this.props.viewMode==='time') {
            this.setState({choseDate: date, before, hasChoseDate: true})
        }else {
            this.setState({choseDate: date, before})
            if(this.props.closeOnSelect) {
                this._notifyView(date)
            }
        }
    }
    
    _getPrefixDate() {
        const state = this.state
        const firstWeekOfMonth = getWeekOfDate(state.year, state.month, 1)
        let restDate = firstWeekOfMonth
        if(restDate > 0) {
            const isFirstMonth = state.month===0
            const lastMonthYear = isFirstMonth ? state.year-1 : state.year
            const lastMonth = isFirstMonth ? 11 : state.month-1
            const lastMonthDays = getYMDays(lastMonthYear, lastMonth)
            const dates = []
            while (restDate > 0) {
                dates.push({date:new Date(lastMonthYear, lastMonth, lastMonthDays-restDate+1),thisMonth: false})
                --restDate
            }
            return dates
        }
        return []
    }

    _getSubfixDate() {
        const state = this.state
        const isLastMonth = state.month===11
        const nextMonthYear = isLastMonth ? state.year+1 : state.year
        const nextMonth = isLastMonth ? 0 : state.month+1
        const lastDate = new Date(nextMonthYear, nextMonth, 0)
        const lastWeekOfMonth = lastDate.getDay()
        let restDate = 6-lastWeekOfMonth
        const dates = []
        while (restDate > 0) {
            dates.unshift({date:new Date(nextMonthYear, nextMonth, restDate--),thisMonth: false})
        }
        return dates
    }


    getDates() {
        const preDate = this._getPrefixDate()
        const nextDate = this._getSubfixDate()
        const dates = []
        const year = this.state.year
        const month =this.state.month
        let monthDays = getYMDays(year, month)
        while (monthDays > 0) {
            dates.unshift({date:new Date(year, month, monthDays--),thisMonth: true})
        }
        return preDate.concat(dates).concat(nextDate)
    }

    clickLeft() {
        const year = this.state.year
        const month = this.state.month
        const isFirstMonth = month === 0
        this.setState({year: isFirstMonth?year-1:year, month: isFirstMonth?11:month-1,direction:'Left'})
    }

    clickRight() {
        const year = this.state.year
        const month = this.state.month
        const isLastMonth = month === 11
        this.setState({year: isLastMonth?year+1:year, month: isLastMonth?0:month+1,direction:'Right'})
    }

    renderDates() {
        const dates = this.getDates()
        const _choseDate = this.state.choseDate
        let weeks = dates.splice(0,7)
        let childs = []
        while (weeks.length) {
            let child = weeks.map((c,i) => <span key={''+this.key+i} onClick={this.choseDate.bind(this, c)} className={(c.thisMonth?"in":"out")+(isToday(c.date)?" today":"")+(sameDay(_choseDate, c.date)?" chose":"")}>{c.date.getDate()}</span>)
            childs.push(<div className="cal-week-case" key={this.key++}>{child}</div>)
            weeks = dates.splice(0,7)
        }
        return childs
    }

    renderHours() {
        return [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].map(v => <span onClick={this.chooseHour.bind(this, v)} className={this.state.hour==v?'cal-hour active':'cal-hour'} key={v}>{v}</span>)
    }

    chooseHour(v) {
        this.setState({hour: v})
    }

    confirm() {
        const time = this.props.viewMode === 'time' && this.state.hasChoseDate ? this.state.hour : ''
        this._notifyView(this.state.choseDate, time, false)
    }

    cancel() {
        this._notifyView('', '', true)
    }

    render() {
        const props = this.props
        const state = this.state
        const language = props.language
        const choseDate = state.choseDate
        const dates = this.renderDates()
        const dateFormat = this._getChoseDate()
        const _month = months[language][state.month]
        const _week = choseDate ? weekends[language][choseDate.getDay()] : ''
        const viewMode = props.viewMode
        const _hour = viewMode === 'time' && state.hasChoseDate ? state.hour+hour[language] : ''
        return (
            <div className="cal-day" style={props.panelStyle}>
                <div className="cal-title">
                    <div className="cal-title-cover">
                        <ReactCssTransitionGroup
                            transitionName={state.before ? "slideUp" : "slideDown"}
                            transitionEnterTimeout={500}
                            transitionLeave={false}
                        >
                            <div key={_week+dateFormat+'-fill'} className="chose-date">
                                <span className="weekend" key={_week}>{_week}</span>
                                <span className="date" key={dateFormat+'date'}>{dateFormat}</span>
                                <span className="hour" key={_hour}>{_hour}</span>
                            </div>
                        </ReactCssTransitionGroup>
                    </div>
                </div>
                <div className="cal-date-panel">
                    {
                        props.viewMode==='time'&&state.hasChoseDate
                        ? this.renderHours() :
                        <div>
                            <div className="cal-current-month">
                                <button className="left" onClick={this.clickLeft}>&#60;</button>
                                <span className="y-m-cover">
                                    <ReactCssTransitionGroup
                                        transitionName={state.direction === "Right" ? "slideDown" : "slideUp"}
                                        transitionEnterTimeout={500}
                                        transitionLeave={false}
                                    >
                                        <span key={_month+state.year} className="current-month">
                                            <span className="y-m-title" key={_month}>{_month+' '}</span>
                                            <span className="y-m-title" key={state.year}>{state.year}</span>
                                        </span>
                                    </ReactCssTransitionGroup>
                                </span>
                                <button className="right" onClick={this.clickRight}>&#62;</button>
                            </div>
                            <div className="cal-week" key="cal-week">
                                {
                                    week[props.language].map(w => <span key={w} className="cal-week-item">{w}</span>)
                                }
                            </div>
                            <div className="cal-day-body">
                                <ReactCssTransitionGroup
                                    transitionName={"slide"+state.direction}
                                    transitionEnterTimeout={500}
                                    transitionLeaveTimeout={500}
                                >
                                    <div className="cal-day-body-entity" key={_month+state.year}>{dates}</div>
                                </ReactCssTransitionGroup>
                            </div>
                        </div>
                    }
                    <div className="cal-day-buttons">
                        <button onClick={this.cancel}>{buttons[language].days.cancel}</button>
                        <button onClick={this.confirm}>{buttons[language].days.confirm}</button>
                    </div>
                </div>
            </div>
        )
    }
}

DaysView.PropTypes = {
    language: PropTypes.oneOf(['chinese', 'english']).isRequired,
    defaultValue: PropTypes.instanceOf(Date),
    onChoose: PropTypes.func.isRequired,
    format: PropTypes.string.isRequired,
    clearWhenCancel: PropTypes.bool.isRequired,
    closeOnSelect: PropTypes.bool.isRequired
}