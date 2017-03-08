/**
 * Author: humingzhi
 * Date: 20/02/2017
 * Email: 1330745625@qq.com
 * Simply react component for datetime picker, only support date now
 */
import React, {Component, PropTypes} from 'react'
import ReactCssTransitionGroup from 'react-addons-css-transition-group'
import Days from './views/DaysView'
import {formatDate} from './utils/helper'

export default class Calendar extends Component {
    constructor(props) {
        super(props)
        this.state = {focus: false, inputValue: props.value||void(0)}
        this._handleDayChoose = this._handleDayChoose.bind(this)
        this.clickOutsideHandler = this.clickOutsideHandler.bind(this)
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.clickOutsideHandler)
        document.addEventListener('touchstart', this.clickOutsideHandler)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.clickOutsideHandler)
        document.removeEventListener('touchstart', this.clickOutsideHandler)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({inputValue: nextProps.value})
    }
    
    _handleDayChoose(date, cancel) {
        if(cancel) return
        this.props.onChange && this.props.onChange(date)
        this.setState({inputValue: date, focus: false})
    }

    inputFocus() {
        this.setState({focus: true})
    }

    clickOutsideHandler(e) {
        e.stopPropagation()
        if(!this.state.focus) return
        if(this.refs.picker.contains(e.target)) return
        this.setState({focus: false})
        this.props.clickOutside && this.props.clickOutside(e)
    }

    render() {
      	const props = this.props
        const open = props.open || this.state.focus
        const viewMode = props.viewMode
        const value = formatDate(props.viewMode, this.state.inputValue, props[viewMode+'Format'])
        return (
            <div className="cal-picker" ref="picker">
                <input type="text" {...props.inputProps} value={value} onFocus={this.inputFocus.bind(this)} />
                <ReactCssTransitionGroup
                    transitionName={props.disablePanelAnimation || props.panelAnimation}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {open && <Days 
                        key="days-panel" 
                        onChoose={this._handleDayChoose} 
                        defaultValue={this.state.inputValue} 
                        language={props.language}
                        format={props[viewMode+'Format']}
                        clearWhenCancel={props.clearWhenCancel}
                        closeOnSelect={props.closeOnSelect}
                    />}
                </ReactCssTransitionGroup>
            </div>
        )
    }
}

Calendar.PropTypes = {
    language: PropTypes.oneOf(['chinese', 'english']),
    value: PropTypes.instanceOf(Date),
    daysFormat: PropTypes.string,
    open: PropTypes.bool,
    onChange: PropTypes.func,
    clearWhenCancel: PropTypes.bool,
    viewMode: PropTypes.oneOf(['days', 'time', 'months', 'years']),
    inputProps: PropTypes.object,
    closeOnSelect: PropTypes.bool,
    closeOnClickOutside: PropTypes.bool,
    disablePanelAnimation: PropTypes.bool,
    panelAnimation: PropTypes.oneOf(['fade', 'zoom'])
}

Calendar.defaultProps = {
    disablePanelAnimation: false,
    language: 'chinese',
    daysFormat: 'YYYY年MM月DD日',
    open: false,
    viewMode: 'days',
    closeOnSelect: false,
    clearWhenCancel: false,
    closeOnClickOutside: true,
    panelAnimation: 'fade'
}
