import React from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import { Shake, ShakeRotate, ShakeSlow } from 'reshake';

class Timer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            hidden: false,
            isOn: false,
            maxTime: 30,
            currentTime: 30,
            maxMinutes: 0,
            maxSeconds: 30,
            currentMinutes: 0,
            currentSeconds: 30,
            progress: 0,
            shakeIsOn: false,
            nameOfBuff: ""
        }

        this.startTimer = this.startTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
        this.onMinutesChange = this.onMinutesChange.bind(this)
        this.onSecondsChange = this.onSecondsChange.bind(this)
        this.onNameChange = this.onNameChange.bind(this)
        this.countDown = this.countDown.bind(this)
        this.findProgress = this.findProgress.bind(this)
        this.setShake = this.setShake.bind(this)
        this.hideComponent = this.hideComponent.bind(this)
    }

    startTimer(){
        if (!this.state.isOn){
            this.setState({isOn: true})
            this.setState({currentTime: this.state.maxTime})
            this.setState({currentMinutes: this.state.maxMinutes})
            this.setState({currentSeconds: this.state.maxSeconds})
            this.timer = setInterval(this.countDown, 1000)
        }
        /*
        this.timer = setInterval(() => this.setState({
            currentTime: this.state.currentTime - 1,
            
        }), 1000)
        */
        console.log("start")
    }

    countDown(){
        console.log("secs:")
        console.log(this.state.currentSeconds)
        console.log("mins:")
        console.log(this.state.currentMinutes)
        //i dont have seconds or mins
        if (this.state.currentSeconds == 0 && this.state.currentMinutes == 0){
            console.log("end the countdown")
            clearInterval(this.timer)
        }
        //i dont have seconds but i have mins
        if (this.state.currentSeconds == 0 && this.state.currentMinutes > 0){
            console.log("sub from mins for secs")
            this.setState({currentMinutes: this.state.currentMinutes - 1})
            this.setState({currentSeconds: this.state.currentSeconds + 60})
        }
        //i have seconds
        if (this.state.currentSeconds > 0){
            console.log("- 1 sec")
            this.setState({currentSeconds: this.state.currentSeconds - 1})
        }
        this.findProgress();
        //this.setShake();
    }

    findProgress(){
        let sec = this.state.currentSeconds;
        let min = this.state.currentMinutes;
        let maxSec = this.state.maxSeconds;
        let maxMin = this.state.maxMinutes;

        min = min * 60
        maxMin = maxMin * 60

        sec = min + sec
        maxSec = maxMin + maxSec

        this.setState({progress: sec / maxSec * 100})
    }
    setShake(){
        if (this.state.progress === 0){
            this.setState({shakeIsOn: true})
        }
        else{
            this.setState({shakeIsOn: false})
        }
    }

    resetTimer(){
        clearInterval(this.timer)
        this.setState({isOn: false })
        this.setState({currentMinutes: this.state.maxMinutes})
        this.setState({currentSeconds: this.state.maxSeconds})
        this.setState({currentTime: this.state.maxTime})
        this.setState({progress: 0})
        console.log("reset");
    }

    onMinutesChange(e){
        this.setState({maxMinutes: e.target.value})
        console.log("min ok")
    }

    onSecondsChange(e){
        this.setState({maxTime: e.target.value})
        this.setState({maxSeconds: e.target.value})
        console.log("sec ok")
    }
    onNameChange(e){
        this.setState({nameOfBuff: e.target.value})
        console.log("name ok")
    }
    hideComponent(e){
        this.setState({hidden: true})
    }
    render(){
            if (this.state.hidden == true){
                return(
                    <div></div>
                );
            }
            else {
            return (
            <div class="ui container" style={{ marginLeft: '100px' }}>
            {/*  <div class="ui container">  */}
                {/* 
                <div>
                    <span className="firstLabel">Input minutes</span>
                    <span className="secondLabel">Input seconds</span>
                </div>
                */}
                <br/>
                <div class="ui input">
                    <input class="ui input" type="text" placeholder="Name of buff..." value={this.state.nameOfBuff} onChange={this.onNameChange}/>
                    <input type="number" size="5" value={this.state.maxMinutes} onChange={this.onMinutesChange} />
                    <input type="number" size="5" value={this.state.maxTime} onChange={this.onSecondsChange} />
                    <button onClick={this.startTimer}>Start</button>
                    <button onClick={this.resetTimer}>Reset</button>
                    <button onClick={this.hideComponent}>Delete</button>
                </div>
                <br/>
                <label style={{ fontSize: 25 }}>{this.state.nameOfBuff}</label>
                <label style={{ fontSize: 20 }}>{this.state.currentMinutes} mins {this.state.currentSeconds} secs</label>

                <ShakeRotate
                    fixed={this.state.shakeIsOn}
                    >

                    <ProgressBar
                     completed={this.state.progress}
                     bgColor="#e8871b"
                     baseBgColor="#dad9d9"
                     labelColor="#ffffff"
                     isLabelVisible={false}
                     />

                </ShakeRotate>
            </div>
            );
            }
    }
}

export default Timer;